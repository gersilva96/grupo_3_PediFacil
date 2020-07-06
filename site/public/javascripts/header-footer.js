window.addEventListener("load", () => {
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

    darkModeBtn.addEventListener("click", () => {darkMode()});

    darkModeSwitch.addEventListener("click", () => {darkMode()});

    let darkModeEnabled;

    const darkMode = () => {
        body.classList.toggle("dark");
        if (darkModeEnabled == undefined || !darkModeEnabled) {
            logo.src = "/images/logo/logoWhiteH.svg";
            darkModeEnabled = true;
        } else {
            logo.src = "/images/logo/logoColorH.svg";
            darkModeEnabled = false;
        }
    };

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle('opened');
        menuBtn.setAttribute('aria-expanded', menuBtn.classList.contains('opened'));
        mainNav.classList.toggle("hidden");
        body.classList.toggle("no-scroll");
    });

    searchToggle.addEventListener("click", () => {
        lens.style.color = "#4285F4";
        setTimeout(() => {
            if (!darkModeEnabled) {
                lens.style.color = "#313A46";
            } else {
                lens.style.color = "#F9FBFE";
            }
        }, 100);
        searchBar.classList.toggle("closed");
        searchBarInput.focus();
    });
});