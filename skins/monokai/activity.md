## Activity Diagram Example


```plantuml
    @startuml
    !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/monokai/monokai.skin.iuml
    
    start
    :ClickServlet.handleRequest();
    :new page;


    if (do redirect?) then (yes)
    :redirect process;
    else
    if (do forward?) then (yes)
        :Forward request;
    else (no)
        :Render page template;
    endif
    fork
    :foo;
    endfork
    endif

    stop

    @enduml
```