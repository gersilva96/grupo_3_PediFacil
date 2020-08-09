window.addEventListener("load", () => {
    const metaThemeColor = document.querySelector("meta.theme-color");
    const body = document.querySelector("body");
    const menuBtn = document.querySelector(".menu");
    const mainNav = document.getElementById("main-nav");
    const logo = document.getElementById("logo");
    const searchToggle = document.querySelector(".search-toggle");
    const searchBar = document.querySelector(".search-bar");
    const searchBarInput = document.getElementById("search-bar_input");
    const lens = searchToggle.querySelector("i");
    const darkModeBtn = document.getElementById("darkmode-btn");
    const darkModeSwitch = document.getElementById("darkmode-switch");
    const imgError = document.getElementById("404error");

    let darkModeStatus = window.localStorage.getItem("darkmode");
    if (darkModeStatus === null) {
        window.localStorage.setItem("darkmode", "inactive");
    }

    const setDarkMode = () => {
        logo.src = "/images/logo/logoWhiteH.svg";
        (imgError != undefined) && (imgError.src = "/images/404dark.svg");
        metaThemeColor.setAttribute("content", "#313A46");
        window.localStorage.setItem("darkmode", "active");
        body.classList.add("dark");
        darkModeSwitch.setAttribute("checked", "");
    }

    const unsetDarkMode = () => {
        logo.src = "/images/logo/logoColorH.svg";
        (imgError != undefined) && (imgError.src = "/images/404.svg");
        metaThemeColor.setAttribute("content", "#FFFFFF");
        window.localStorage.setItem("darkmode", "inactive");
        body.classList.remove("dark");
        darkModeSwitch.removeAttribute("checked");
    }

    const toggleDarkMode = () => {
        let enabled = window.localStorage.getItem("darkmode");
        if (enabled == "inactive") {
            setDarkMode()
        } else if (enabled == "active") {
            unsetDarkMode();
        }
    }

    (darkModeStatus == "active") && setDarkMode();
    (darkModeStatus == "inactive") && unsetDarkMode();

    darkModeBtn.addEventListener("click", () => {
        toggleDarkMode();
        menuBtn.click();
    });

    darkModeSwitch.addEventListener("click", () => {toggleDarkMode()});

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle('opened');
        menuBtn.setAttribute('aria-expanded', menuBtn.classList.contains('opened'));
        mainNav.classList.toggle("hidden");
        body.classList.toggle("no-scroll");
    });

    searchToggle.addEventListener("click", () => {
        lens.style.color = "#4285F4";
        setTimeout(() => {
            if (!darkModeStatus) {
                lens.style.color = "#313A46";
            } else {
                lens.style.color = "#F9FBFE";
            }
        }, 100);
        searchBar.classList.toggle("closed");
        searchBarInput.focus();
    });
});