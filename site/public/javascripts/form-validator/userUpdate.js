const userUpdateForm = document.getElementById("user-update_form");
const userUpdateFields = userUpdateForm.querySelectorAll(".form-control");

const userUpdateRegEx = {
	business_name: /^[a-zA-Z0-9\&\.\_\-\sÀ-ÿ]{2,50}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    first_name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    last_name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	image: /^.+\.(jpg|png|jpeg)$/
};

let userUpdateInputs = {
    business_name: false,
    email: false,
    first_name: false,
    last_name: false,
    image: false
};

const userUpdateCheckForm = (e) => {
    switch (e.target.name) {
        case "business_name":
            userUpdateCheckField(userUpdateRegEx.business_name, e.target);
            break;
        case "email":
            userUpdateCheckField(userUpdateRegEx.email, e.target);
            break;
        case "first_name":
            userUpdateCheckField(userUpdateRegEx.first_name, e.target);
            break;
        case "last_name":
            userUpdateCheckField(userUpdateRegEx.last_name, e.target);
            break;
        case "image":
            if (e.target.value.length != 0) {
                userUpdateCheckField(userUpdateRegEx.image, e.target);
            }
            break;
    }
};

const userUpdateCheckField = (regex, inputname) => {
    let input;
    if (typeof(inputname) == "string") {
        input = document.getElementById(inputname);
    } else {
        input = inputname;
    }
    if (input.id == "image" && input.value.length == 0) {
        userUpdateInputs["image"] = true;
    } else {
        if (!regex.test(input.value)) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            userUpdateInputs[input.id] = false;
        } else {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            userUpdateInputs[input.id] = true;
        }
    }
};

userUpdateFields.forEach(input => {
    if (input.id == "image") {
        input.addEventListener("change", userUpdateCheckForm);
    } else {
        input.addEventListener("keyup", userUpdateCheckForm);
        input.addEventListener("blur", userUpdateCheckForm);
    }
});

userUpdateForm.addEventListener("submit", (e) => {
    userUpdateCheckField(userUpdateRegEx.business_name, "business_name");
    userUpdateCheckField(userUpdateRegEx.email, "email");
    userUpdateCheckField(userUpdateRegEx.first_name, "first_name");
    userUpdateCheckField(userUpdateRegEx.last_name, "last_name");
    userUpdateCheckField(userUpdateRegEx.image, "image");
    for (const input in userUpdateInputs) {
        if (!userUpdateInputs[input]) {
            e.preventDefault();
        }
    }
});