## Deployment Elements Example


```plantuml
    @startuml
    !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/light-orange/light-orange.skin.iuml

    Header \n Listing all Elements \n
    Title <u>Deployment Elements</u> \n

    skinparam rectangle {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam artifact {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }

    skinparam database {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam package {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam storage {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam usecase {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam folder {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam agent {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam cloud {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam frame {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam queue {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam stack {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam card {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam file {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam node {
        BorderColor     BORDER_COLOR
        BackgroundColor BACKGROUND_COLOR
        FontColor       FONT_COLOR
    }
    
    skinparam actor {
        BorderColor     BORDER_COLOR_2
        BackgroundColor BACKGROUND_COLOR_2
    }
    
    skinparam entity {
        BorderColor     BORDER_COLOR_2
        BackgroundColor BACKGROUND_COLOR_2
    }

    skinparam interface {
        BorderColor     BORDER_COLOR_2
        BackgroundColor BACKGROUND_COLOR_2
    }
    
    skinparam control {
        BorderColor     BORDER_COLOR_2
        BackgroundColor BACKGROUND_COLOR_2
    }
    
    skinparam boundary {
        BorderColor     BORDER_COLOR_2
        BackgroundColor BACKGROUND_COLOR_2
    }
    

    rectangle Rectangle
    component Component
    artifact  Artifact
    database  Database
    package   Package
    storage   Storage
    usecase   Usecase    
    folder    Folder
    agent     Agent
    cloud     Cloud
    frame     Frame
    queue     Queue
    stack     Stack
    card      Card
    file      File
    node      Node
    
    interface Interface
    boundary  Boundary
    control   Control
    entity    Entity
    actor     Actor

    legend right
        - Nice components
        - Is much good yes
    endlegend

    Footer \n\n\t Our compoentns in the middle of the page

    @enduml
```
