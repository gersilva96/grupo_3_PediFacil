const orderDescriptionForm = document.getElementById("order-description_form");
const orderDescriptionField = orderDescriptionForm.querySelector(".form-control");

const orderDescriptionRegEx = /^.{0,50}$/;

let orderDescriptionInput = false;

const check = () => {
    if (!orderDescriptionRegEx.test(orderDescriptionField.value)) {
        orderDescriptionField.classList.add("is-invalid");
        orderDescriptionField.classList.remove("is-valid");
        orderDescriptionInput = false;
    } else {
        orderDescriptionField.classList.add("is-valid");
        orderDescriptionField.classList.remove("is-invalid");
        orderDescriptionInput = true;
    }
};

orderDescriptionField.addEventListener("keyup", check);
orderDescriptionField.addEventListener("blur", check);

orderDescriptionForm.addEventListener("submit", (e) => {
    if(!orderDescriptionInput) {
        e.preventDefault();
    }
});