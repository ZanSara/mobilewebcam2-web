
// Remember that: https://stackoverflow.com/questions/53759070/how-to-get-path-directory-from-filereader
function loadConfigFile(event) {

    var input = event.target;
    
    var reader = new FileReader();
    reader.onload = function(){                
        window.config_file_json = reader.result;
        document.getElementById("config-file-name").innerHTML = "Current file: <b>" + input.files[0].name +"</b>";
        
        // Remove all menu-entry and menu-page
        var elements = document.getElementsByClassName('menu-entry');
        while(elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        var pages = document.getElementsByClassName('menu-page');
        var i = 0;
        while(pages.length > i) {
            if(pages[i].id === "main-menu"){
                i = i + 1;
            } else {
                pages[i].parentNode.removeChild(pages[i]);
            }
        }
        // Puts back the placeholders in place
        if( !document.getElementById("menu-entries-placeholder") ){
            var menu_entry_placeholder = document.createElement("div");
            menu_entry_placeholder.setAttribute("id", "menu-entries-placeholder");
            menu_entry_placeholder.setAttribute("class", "col-12");
            menu_entry_placeholder.innerHTML = "<hr /><i>Select a configuration file to see and edit its content</i> ";
            document.getElementById("main-menu").appendChild(menu_entry_placeholder); 
        }
        if( !document.getElementById("menu-pages-placeholder") ){          
            var menu_entry_placeholder = document.createElement("div");
            menu_entry_placeholder.setAttribute("id", "menu-pages-placeholder");
            menu_entry_placeholder.setAttribute("class", "col-12");
            menu_entry_placeholder.innerHTML = "";
            document.getElementById("entire-form").appendChild(menu_entry_placeholder); 
        }
        
        populate_web_interface(window.config_file_json);
    };
    reader.readAsText(input.files[0]);
}

