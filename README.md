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
makeitpdf path/to/design-file.md
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
makeitpdf Functional_Spec.md
```

* _Typically, this will be a git-hook on every `push` or something like that, uploading the resulting PDF file to your documentation system etc ..._
  
* _A developer working on any part of the project can easily update the documentation of the relevant component or module, hassle free_

* _Please see the **`/example`** folder for a full example of how modular your documentation can be (coming soon)_




## Features

- **`Markdown`** files can include other **`Markdown`** files
- Supports **`PlantUML`** syntax for diagrams
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