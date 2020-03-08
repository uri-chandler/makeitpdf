##### Branches Example

<details>
<summary>Click to see full PlantUML Code</summary>
<p>

    ```plantuml
        @startuml
        !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/light-orange/light-orange.skin.iuml

        Title \n <u>Branches</u> \n

        (*) --> "Initialization"

        if "Some Test" then
            -->[true] "Some Activity"
            --> "Another activity"
            -right-> (*)
        else
            ->[false] "Something else"
            -->[Ending process] (*)
        endif

        @enduml
    ```

</p>
</details>


<br />

```plantuml
    @startuml
    !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/light-orange/light-orange.skin.iuml

    Title \n <u>Branches</u> \n

    (*) --> "Initialization"

    if "Some Test" then
        -->[true] "Some Activity"
        --> "Another activity"
        -right-> (*)
    else
        ->[false] "Something else"
        -->[Ending process] (*)
    endif

    @enduml
```