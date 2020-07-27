const loginForm = document.getElementById("login_form");
const loginFields = loginForm.querySelectorAll(".form-control");

const loginRegEx = {
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	password: /^.{6,18}$/,
};

let loginInputs = {
    email: false,
    password: false,
};

const loginCheckForm = (e) => {
    switch (e.target.name) {
        case "email":
            loginCheckField(loginRegEx.email, e.target);
            break;
        case "password":
            loginCheckField(loginRegEx.password, e.target);
            loginPasswordRepeat();
            break;
    }
};

const loginCheckField = (regex, input) => {
    if (!regex.test(input.value)) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        loginInputs[input.id] = false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        loginInputs[input.id] = true;
    }
};

loginFields.forEach(input => {
    input.addEventListener("keyup", loginCheckForm);
    input.addEventListener("blur", loginCheckForm);
});

loginForm.addEventListener("submit", (e) => {
    loginCheckField(loginRegEx.password, password);
    loginCheckField(loginRegEx.email, email);
    for (const input in loginInputs) {
        if (!loginInputs[input]) {
            e.preventDefault();
        }
    }
});