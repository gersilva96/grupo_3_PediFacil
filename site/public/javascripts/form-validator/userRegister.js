const registerForm = document.getElementById("register_form");
const registerFields = registerForm.querySelectorAll(".form-control");

const registerRegEx = {
    role: /^[2-3]$/,
	business_name: /^[a-zA-Z0-9\&\.\_\-\sÀ-ÿ]{2,50}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    first_name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    last_name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	password: /^.{6,18}$/,
};

let registerInputs = {
    role: false,
    business_name: false,
    email: false,
    first_name: false,
    last_name: false,
    password: false,
    password_repeat: false
};

const registerPasswordRepeat = () => {
    const password = document.getElementById("password");
    const password_repeat = document.getElementById("password_repeat");
    if (password.value != password_repeat.value || password_repeat.value.length == 0) {
        password_repeat.classList.add("is-invalid");
        password_repeat.classList.remove("is-valid");
        registerInputs[password_repeat.id] = false;
    } else {
        password_repeat.classList.add("is-valid");
        password_repeat.classList.remove("is-invalid");
        registerInputs[password_repeat.id] = true;
    }
};

const registerCheckForm = (e) => {
    switch (e.target.name) {
        case "role":
            registerCheckField(registerRegEx.role, e.target);
            break;
        case "business_name":
            registerCheckField(registerRegEx.business_name, e.target);
            break;
        case "email":
            registerCheckField(registerRegEx.email, e.target);
            break;
        case "first_name":
            registerCheckField(registerRegEx.first_name, e.target);
            break;
        case "last_name":
            registerCheckField(registerRegEx.last_name, e.target);
            break;
        case "password":
            registerCheckField(registerRegEx.password, e.target);
            registerPasswordRepeat();
            break;
        case "password_repeat":
            registerPasswordRepeat();
            break;
    }
};

const registerCheckField = (regex, inputname) => {
    let input;
    if (typeof(inputname) == "string") {
        input = document.getElementById(inputname);
    } else {
        input = inputname;
    }
    if (!regex.test(input.value)) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        registerInputs[input.id] = false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        registerInputs[input.id] = true;
    }
};

registerFields.forEach(input => {
    input.addEventListener("keyup", registerCheckForm);
    input.addEventListener("blur", registerCheckForm);
});

registerForm.addEventListener("submit", (e) => {
    registerCheckField(registerRegEx.business_name, "business_name");
    registerCheckField(registerRegEx.first_name, "first_name");
    registerCheckField(registerRegEx.last_name, "last_name");
    registerCheckField(registerRegEx.password, "password");
    registerCheckField(registerRegEx.email, "email");
    registerCheckField(registerRegEx.role, "role");
    registerPasswordRepeat();
    for (const input in registerInputs) {
        if (!registerInputs[input]) {
            e.preventDefault();
        }
    }
});