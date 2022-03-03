#!/usr/bin/env node

const MarkdownIt = require('markdown-it');
const Toolog     = require('toolog');

const puppeteer  = require('puppeteer');
const mustache   = require('mustache');
const cheerio    = require('cheerio');
const yargs      = require('yargs');
const hljs       = require('highlight.js');
const path       = require('path');
const url        = require('url');
const fs         = require('fs');

const markdownItPlantUML     = require('markdown-it-plantuml');
const markdownItCheckbox     = require('markdown-it-checkbox');
const markdownItNamedHeaders = require('markdown-it-named-headers');
const markdownItTOCDoneRight = require('markdown-it-toc-done-right');

const options = yargs.argv;
const log     = new Toolog('makeitpdf');


async function start() {
    console.log();

    if (typeof options.source !== 'string' || options.source.trim().length === 0)
        exitWithUsage('Missing (or empty) source file');

    const sourcePath = path.resolve(options.source);
    assertSourcePath(sourcePath);

    let content;
    content = readSourceContent(sourcePath);
    content = includeNestedMarkdownFiles(sourcePath, content);
    content = includeNestedPlantUMLFiles(sourcePath, content);
    content = replacePlantUMLCodeToDiagrams(content);

    const md = initMarkdownIt();
    setImageRenderer(md, sourcePath);
    setHTMLBlockRenderer(md, sourcePath);

    log.info('Loading MarkdownIt Plugins');
    md.use(markdownItCheckbox);
    md.use(markdownItNamedHeaders, { slugify });
    md.use(markdownItTOCDoneRight);
    md.use(markdownItPlantUML, {server: options.server || 'http://www.plantuml.com/plantuml'});
    log.done(' -> ok\n');

    log.info('Rendering content');
    content = md.render(content);
    content = renderTemplate(content, sourcePath);
    log.done(' -> ok\n');
    await saveAsPDF(content, sourcePath);

    console.log();
    log.done('All Done!');
}

async function saveAsPDF(content, sourcePath) {
    log.info('Saving as PDF');

    const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox']});
    const page    = await browser.newPage();

    await page.setViewport({width: 1600, height: 1200, deviceScaleFactor: 2});
    await page.setContent(content, { waitUntil: 'networkidle0' });

    const outPath = path.resolve(
        path.dirname(sourcePath),
        path.basename(sourcePath).replace('.md', '.pdf')
    );

    await page.pdf({
        path           : outPath,
        printBackground: true
    });

    await browser.close();
    log.done(` -> ok, PDF saved here: ${outPath}`);
}

function assertSourcePath(sourcePath) {
    log.info('Validating source file');
    if (fs.existsSync(sourcePath) === false)
        exitWithError(` -> Could not find source file at: ${sourcePath} (quitting)`);
    else
        log.done(' -> ok\n');
}

function readSourceContent(sourcePath) {
    log.info('Reading source content')

    try {
        const content = fs.readFileSync(sourcePath, 'utf8');
        log.done(' -> ok\n');
        return content;
    }
    catch (e) {
        log.error(' -> Could not read content: ', e.message);
        process.exit(1);
    }
}

function includeNestedMarkdownFiles(sourcePath, content) {

    const nestedFiles = content.match(/\:\[.+\]\(.+\.md\)/gi);
    if (!nestedFiles)
        return content;

    log.info(`Loading nested markdown files for ${sourcePath}`);
    nestedFiles.forEach(file => {
        const nestedSourcePath = path.resolve(path.dirname(sourcePath), file.match(/\]\((.*)\)/)[1]);

        if (fs.existsSync(nestedSourcePath) === false)
            exitWithError(` -> Could not find nested markdown file ${nestedSourcePath} (quitting)`);
        else
            log.warn(` -> Loading ${nestedSourcePath}`);

        const nestedSourceContent = fs.readFileSync(nestedSourcePath, 'utf8');
        content = content.replace(file, includeNestedMarkdownFiles(nestedSourcePath, nestedSourceContent));
    });
    log.done(' -> ok\n');

    return content;
}

function includeNestedPlantUMLFiles(sourcePath, content) {

    const nestedFiles = content.match(/\s*!include\s+[^\s]+/gi);
    if (!nestedFiles)
        return content;

    log.info(`Loading nested plantuml files for ${sourcePath}`);
    nestedFiles.forEach(file => {
        const nestedSourcePath = path.resolve(path.dirname(sourcePath), file.match(/!include\s+([^\s]+)/)[1]);

        if (fs.existsSync(nestedSourcePath) === false)
            exitWithError(` -> Could not find nested plantuml file ${nestedSourcePath} ${sourcePath} (quitting)`);
        else
            log.warn(` -> Loading ${nestedSourcePath}`);

        const nestedSourceContent = fs.readFileSync(nestedSourcePath, 'utf8');
        content = content.replace(file, includeNestedPlantUMLFiles(nestedSourcePath, nestedSourceContent));
    });
    log.done(' -> ok\n');

    return content;
}

function initMarkdownIt() {
    log.info('Initializing MarkdownIt');
    const mdit = MarkdownIt({
        html: true,

        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    str = hljs.highlight(lang, str, true).value;
                }
                catch (e) {
                    str = MarkdownIt.utils.escapeHtml(str);
                }
            }
            else
                str = MarkdownIt.utils.escapeHtml(str);

            return '<pre class="hljs"><code><div>' + str + '</div></code></pre>';
        }
    });

    log.done(' -> ok\n');
    return mdit;
}

function setImageRenderer(md, sourcePath) {
    log.info('Setting Image-Renderer');
    const defaultRender = md.renderer.rules.image;

    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx];

        let href;
        href = token.attrs[token.attrIndex('src')][1];
        href = updateImagePath(href, sourcePath);

        token.attrs[token.attrIndex('src')][1] = href;
        return defaultRender(tokens, idx, options, env, self);
    };

    log.done(' -> ok\n');
}

function setHTMLBlockRenderer(md, sourcePath) {
    log.info('Setting HTML-Block-Renderer');

    md.renderer.rules.html_block = function (tokens, idx) {
        const html = tokens[idx].content;
        const $    = cheerio.load(html);

        $('img').each(function () {
            const src  = $(this).attr('src');
            const href = updateImagePath(src, sourcePath);
            $(this).attr('src', href);
        });

        return $.html();
    };

    log.done(' -> ok\n');
}

function renderTemplate(content, sourcePath) {
    const style = cssFileToStyleTag('markdown.css')
                + cssFileToStyleTag('markdown-pdf.css')
                + cssFileToStyleTag('zenburn.css');

    const title    = path.basename(sourcePath);
    const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

    return mustache.render(template, { title, style, content });
}

function cssFileToStyleTag(cssPath) {
    return '\n<style>\n'
         + fs.readFileSync(path.join(__dirname, cssPath), 'utf8')
         + '\n</style>\n';
}

function updateImagePath(src, filename) {
    let href = decodeURIComponent(src)
                .replace(/("|')/g, '')
                .replace(/\\/g, '/')
                .replace(/#/g, '%23');


    const protocol = url.parse(href).protocol;

    if (protocol === 'file:' && href.indexOf('file:///') !==0)
        return href.replace(/^file:\/\//, 'file:///');

    if (protocol === 'file:')
        return href;

    if (!protocol || path.isAbsolute(href)) {
        href = path.resolve(path.dirname(filename), href)
                   .replace(/\\/g, '/')
                   .replace(/#/g, '%23');

        if (href.indexOf('//') === 0)
            return 'file:' + href;

        if (href.indexOf('/') === 0)
            return 'file://' + href;

        return 'file:///' + href;
    }

    return src;
}

function slugify(str) {
    // Based on these
    // https://github.com/Microsoft/vscode/blob/b3a1b98d54e2f7293d6f018c97df30d07a6c858f/extensions/markdown/src/markdownEngine.ts
    // https://github.com/Microsoft/vscode/blob/b3a1b98d54e2f7293d6f018c97df30d07a6c858f/extensions/markdown/src/tableOfContentsProvider.ts

    return encodeURI(
        str.trim()
           .toLowerCase()
           .replace(/[\]\[\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~\`]/g, '')
           .replace(/\s+/g, '-')
           .replace(/^\-+/, '')
           .replace(/\-+$/, '')
    );
}

function replacePlantUMLCodeToDiagrams(content) {
    log.info('Replacing PlantUML code-syntax to diagram-syntax');
    const result = content.replace(/```plantuml\s*@startuml/g, '\n@startuml')
                          .replace(/@enduml\s*```/g, '\n@enduml');

    log.done(' -> ok\n');
    return result;
}

function exitWithUsage(eMsg) {
    console.log();
    log.error(`Wrong usage: ${eMsg}`);
    log.warn('Usage: makeitpdf --source path/to/my-markdown.md');

    process.exit(1);
}

function exitWithError(eMsg) {
    log.error(eMsg);
    process.exit(1);
}





start().catch(console.error);
