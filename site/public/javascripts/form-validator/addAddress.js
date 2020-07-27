const addAddressForm = document.getElementById("add-address_form");
const addAddressFields = addAddressForm.querySelectorAll(".form-control");

const addAddressRegEx = {
    first_line: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.\°]{5,50}$/,
    second_line: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.\°]{0,50}$/,
    between_streets: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.\°]{0,100}$/,
    city: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.]{5,50}$/,
    phone: /^[0-9]{6,15}$/
};

let addAddressInputs = {
    first_line: false,
    second_line: false,
    between_streets: false,
    city: false,
    phone: false
};

const addAddressCheckForm = (e) => {
    switch (e.target.name) {
        case "first_line":
            addAddressCheckField(addAddressRegEx.first_line, e.target);
            break;
        case "second_line":
            addAddressCheckField(addAddressRegEx.second_line, e.target);
            break;
        case "between_streets":
            addAddressCheckField(addAddressRegEx.between_streets, e.target);
            break;
        case "city":
            addAddressCheckField(addAddressRegEx.city, e.target);
            break;
        case "phone":
            addAddressCheckField(addAddressRegEx.phone, e.target);
            break;
    }
};

const addAddressCheckField = (regex, inputname) => {
    let input;
    if (typeof(inputname) == "string") {
        input = document.getElementById(inputname);
    } else {
        input = inputname;
    }
    if (!regex.test(input.value)) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        addAddressInputs[input.id] = false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        addAddressInputs[input.id] = true;
    }
};

addAddressFields.forEach(input => {
    input.addEventListener("keyup", addAddressCheckForm);
    input.addEventListener("blur", addAddressCheckForm);
});

addAddressForm.addEventListener("submit", (e) => {
    addAddressCheckField(addAddressRegEx.first_line, "first_line");
    addAddressCheckField(addAddressRegEx.second_line, "second_line");
    addAddressCheckField(addAddressRegEx.between_streets, "between_streets");
    addAddressCheckField(addAddressRegEx.city, "city");
    addAddressCheckField(addAddressRegEx.phone, "phone");
    for (const input in addAddressInputs) {
        if (!addAddressInputs[input]) {
            e.preventDefault();
        }
    }
});