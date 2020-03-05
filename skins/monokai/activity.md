## Activity Diagram Example

Foo
```plantuml
    @startuml
    !include https://raw.githubusercontent.com/uri-chandler/makeitpdf/master/skins/monokai/monokai.skin.iuml
    
    :start;
    fork
        :foo1;
        :foo2;
    fork again
        :foo3;
        detach
    endfork
    
    if (foo4) then
        :foo5;
        detach
    endif
    
    :foo6;
    detach
    
    :ClickServlet.handleRequest();
    :new page;
    if (Page.onSecurityCheck) then (true)
    :Page.onInit();
    if (isForward?) then (no)
        :Process controls;
        if (continue processing?) then (no)
        stop
        endif
        
        if (isPost?) then (yes)
        :Page.onPost();
        else (no)
        :Page.onGet();
        endif
        :Page.onRender();
    endif
    else (false)
    endif

    if (do redirect?) then (yes)
    :redirect process;
    else
    if (do forward?) then (yes)
        :Forward request;
    else (no)
        :Render page template;
    endif
    endif
    stop

    @enduml
```