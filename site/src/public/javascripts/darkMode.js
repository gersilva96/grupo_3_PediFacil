function darkMode() {
    var element = document.body;
    if(element.classList.toggle("dark-mode")){
        document.getElementById('logoHeader').src=('/images/logo/logoWhiteH.svg');
    }else{
        document.getElementById('logoHeader').src=('/images/logo/logoColorH.svg');
    };
}