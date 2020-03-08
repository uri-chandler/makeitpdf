##### Custom Activity Diagram Example

<details>
<summary>Click to see full PlantUML Code</summary>
<p>

    ```plantuml
        @startuml
        !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/light-orange/light-orange.skin.iuml

        Header \n A day in a life
        Title <u>Developer Action Plan</u> \n

        start
        :Day.start();
        :Drink coffee;

        note right
            Note:
            We prefer double espresso!
        endnote

        if (is awake yet?) then (yes)
        :work;
        else (no)
        if (had breakfast?) then (yes)
            :Drink more coffee;
        else (no)
            :Eat a cookie;
        endif
        fork
        :work;
        endfork
        endif

        stop

        legend right
            This legend is
            legendary
        endlegend

        Footer \n\n\t Typical day for John, a software engineer

        @enduml
    ```

</p>
</details>


<br />

```plantuml
    @startuml
    !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/light-orange/light-orange.skin.iuml

    Header \n A day in a life
    Title <u>Developer Action Plan</u> \n

    start
    :Day.start();
    :Drink coffee;

    note right
        Note:
        We prefer double espresso!
    endnote

    if (is awake yet?) then (yes)
    :work;
    else (no)
    if (had breakfast?) then (yes)
        :Drink more coffee;
    else (no)
        :Eat a cookie;
    endif
    fork
    :work;
    endfork
    endif

    stop

    legend right
        This legend is
        legendary
    endlegend

    Footer \n\n\t Typical day for John, a software engineer

    @enduml
```