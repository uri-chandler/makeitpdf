## Component Diagram Example


```plantuml
    @startuml
    !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/light-orange/light-orange.skin.iuml

    Header \n Components are useful \n
    Title <u>System's Components</u> \n

    component BigComp [
        **BigComp**

        This component
        is part of the 
        BigComponents
        package
    ]


    DataAccess -        [Comp A]  :Network Connection
    [Comp A]   ..>      HTTP      :Exposes
    BigComp    .right.> HTTP      :Consumes

    
    
    legend right
        - Comp A is external
        - BigComp is big
    endlegend

    Footer \n\n\t Our OOP Model of the system

    @enduml
```
