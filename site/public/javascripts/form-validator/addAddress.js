const addAddressForm = document.getElementById("add-address_form");
const addAddressFields = addAddressForm.querySelectorAll(".form-control");

const addAddressRegEx = {
    street: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.\°]{2,50}$/,
    number: /^[0-9]{1,6}$/,
    floor: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.\°]{0,40}$/,
    apartment: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.\°]{0,40}$/,
    between_streets: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.\°]{0,100}$/,
    city: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.]{5,50}$/,
    province: /^[a-zA-ZÀ-ÿ\s0-9\-\_\.]{5,50}$/,
    phone: /^[0-9]{6,15}$/
};

let addAddressInputs = {
    street: false,
    number: false,
    floor: true,
    apartment: true,
    between_streets: true,
    city: false,
    province: false,
    phone: false
};

const addAddressCheckForm = (e) => {
    switch (e.target.name) {
        case "street":
            addAddressCheckField(addAddressRegEx.street, e.target);
            break;
        case "number":
            addAddressCheckField(addAddressRegEx.number, e.target);
            break;
        case "floor":
            addAddressCheckField(addAddressRegEx.floor, e.target);
            break;
        case "apartment":
            addAddressCheckField(addAddressRegEx.apartment, e.target);
            break;
        case "between_streets":
            addAddressCheckField(addAddressRegEx.between_streets, e.target);
            break;
        case "city":
            addAddressCheckField(addAddressRegEx.city, e.target);
            break;
        case "province":
            addAddressCheckField(addAddressRegEx.province, e.target);
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
    addAddressCheckField(addAddressRegEx.street, "street");
    addAddressCheckField(addAddressRegEx.number, "number");
    addAddressCheckField(addAddressRegEx.city, "city");
    addAddressCheckField(addAddressRegEx.province, "province");
    addAddressCheckField(addAddressRegEx.phone, "phone");
    for (const input in addAddressInputs) {
        if (!addAddressInputs[input]) {
            e.preventDefault();
        }
    }
});