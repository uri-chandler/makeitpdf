# makeitpdf

A close-to-code, modular - and visual - documentation helper.


- [Motivation](#motivation)
- [Install](#install)
- [Usage](#usage)
- [Short Example](#short-example)
- [Features](#features)
  - [Nested **`Markdown`** files](#nested-markdown-files)
  - [**`PlantUML`** Diagrams](#plantuml-diagrams)
  - [Auto-generated Table-Of-Contents](#auto-generated-table-of-contents)
- [Tips & Tricks](#tips--tricks)
  - [Line breaks](#line-breaks)
  - [GitHub Integration](#github-integration)
  - [VSCode](#vscode)



## Motivation

I wanted a better way to communicate software design.  
And, it needed to be close to the code, so that it will empower developers on my team, and not slow them down or become a hassle.  

The result is short & simple methodology (plus this tool), where:

  1.  _`Solution.md`_ files are kept along source code files
   
  2. Outer _`Solution.md`_ files include lower level files (components hierarchy in code is well represented in documentation this way)
  
  3. Developers can draw diagrams using **code** - which is their natural way for expressing their thoughts and design processes _(using `PlantUML`)_



## Install

```shell
npm i -g makeitpdf
```


## Usage

```shell
makeitpdf --source path/to/Solution.md
```


## Short Example

Imagine a project like the following _(or your own)_:
```
/my-project
  /Component_One
    one.ts
    one.spec.ts
    Solution.md

  /Component_Two
    two.ts
    two.spec.ts
    Solution.md

  ...

  Functional_Spec.md
```

<br />

And _**`Functional_Spec.md`**_ looks like this:
```markdown
# My Project
This is our amazing project.  
It does really cool stuff!

[:Component One](Component_One/Solution.md)
[:Component Two](Component_Two/Solution.md)
```

<br />

You then render everything together using this:
```shell
makeitpdf --source Functional_Spec.md
```

* _Typically, this will be a git-hook on every `push` or something like that, uploading the resulting PDF file to your documentation system etc ..._
  
* _A developer working on any part of the project can easily update the documentation of the relevant component or module, hassle free_

* _Please see the **`/examples`** folder for a full example of how modular your documentation can be_




## Features

- **`Markdown`** files can include other **`Markdown`** files
- **`PlantUML`** syntax for diagrams
- Auto-generated **Table Of Contents**
- Outputs a single **`PDF`** file you can easily share and automate

<br />

---
### Nested **`Markdown`** files

You can include **`Markdown`** in other **`Markdown`** files using the following syntax:  

```Markdown
## Some Foo Notes
[:Foo Placeholder](foo.md)
```
**Notes**
> * _This will load the contents of `foo.md` (from the current folder)_  
> * _The path to "foo.md" is always relative to the current file_
> * _Note that "Foo Placeholder" can be any name you want for the placeholder_  





<br />

### **`PlantUML`** Diagrams

Add **`PlantUML`** diagrams to your document with the following syntax:    

```markdown
## My Solution
Alice can send a message to Bob, and then Bob replies.

    ```plantuml
    @startuml
    Alice -> Bob    :Hi Bob!
    Bob   -> Alice  :Oh, Hi Alice!
    @enduml
    ```    
```

**Notes**
> _This will be rendered using the PlantUML public server, and added as an image in the resulting PDF file_  





<br />

### Auto-generated Table-Of-Contents

Just add **`${toc}`** where you want the Table Of Contents to appear:    

```markdown
# My Solution
This is my amazing feature.

## Table Of Contents
${toc}

...
```


<br />

---

## Tips & Tricks

### Line breaks

Line breaks can really help make the final document much cleaner.  
Luckily, **Markdown** supports HTML, so I recommend adding this at the top of each separate component (i.e. each separate markdown file):  

```markdown
<div style="page-break-after:always"></div>

## My component
...
```


### GitHub Integration

At the moment, GitHub doesn't support rendering of **PlantUML** diagrams within a **Markdown** file.  
As an alternative, there's this awesome Chrome / Firefox extension you can use:  

- [PlantUML Visualizer](https://github.com/WillBooster/plantuml-visualizer)  
  _Thanks [@willbooster](https://github.com/WillBooster) for this really great extension!_

<br />

> _To see this in action after you installed the extension, just browser through the Markdown files in the examples folder here_


### VSCode

I really like seeing my documentation fully rendered when I'm working in VSCode.  
To increase your productivity, I highly recommend the following extensions:  

- [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)  
  This extension integrates well with the built-in **Markdown** preview sidebar that ships by default with VSCode.  
  When your file includes **PlantUML** diagrams, they will render nicely in the preview sidebar

- [vscode-pdf](https://marketplace.visualstudio.com/items?itemName=tomoki1207.pdf)  
  Lets me view the final PDF file within VSCode, saves me the time to switch between a PDF viewer and VSCode.
