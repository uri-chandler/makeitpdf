##### Class Diagram Example

<details>
<summary>Click to see full PlantUML Code</summary>
<p>

```plantuml
@startuml
!include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/light-orange/light-orange.skin.iuml

Header \n Class is in session \n
Title <u>Classes in our project</u> \n

interface Driveable {
    - isEngineRunning
    + startEngine()
    + stopEngine()
    + steerLeft()
    + steerRight()
}

class Car {
    + model
    + year
    - makerFactory 
    # serialNumber
}

class Owner {
    + car <<Car>>
    + name
}

class Driver {
    + driversLicense
    + drive()
}


Driver -right|> Owner
Owner  -up-o    Car
Car    -up|>    Driveable


legend right
    - Interfaces are binding
    - Some classes remain abstract
endlegend

Footer \n\n\t Our OOP Model of the system

@enduml
```

</p>
</details>


<br />

```plantuml
    @startuml
    !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/light-orange/light-orange.skin.iuml

    Header \n Class is in session \n
    Title <u>Classes in our project</u> \n

    interface Driveable {
        - isEngineRunning
        + startEngine()
        + stopEngine()
        + steerLeft()
        + steerRight()
    }

    class Car {
        + model
        + year
        - makerFactory 
        # serialNumber
    }

    class Owner {
        + car <<Car>>
        + name
    }

    class Driver {
        + driversLicense
        + drive()
    }


    Driver -right|> Owner
    Owner  -up-o    Car
    Car    -up|>    Driveable

    
    legend right
        - Interfaces are binding
        - Some classes remain abstract
    endlegend

    Footer \n\n\t Our OOP Model of the system

    @enduml
```
