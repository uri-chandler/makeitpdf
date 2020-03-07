## Class Diagram Example


```plantuml
    @startuml
    !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/light-orange/light-orange.skin.iuml


    Header \n Class is in session
    Title <u>Classes in our project<u> \n

    class Car {
        + model
        + year
        - makerFactory 
        # serialNumber

        + startEngine()
        + stopEngine()
        + steerLeft()
        + steerRight()
    }


    
    
    legend right
        - Interfaces are binding
        - Some classes remain abstract
    endlegend

    Footer \n\n\t Our OOP Model of the system

    @enduml
```
