const selectAddressForm = document.getElementById("select-address_form");
const selectAddressField = selectAddressForm.querySelector(".form-control");
console.log(selectAddressField)

const selectAddressRegEx = /^[0-9]{1,3}$/;

let selectAddressInput = false;

const check = () => {
    if (!selectAddressRegEx.test(selectAddressField.value)) {
        selectAddressField.classList.add("is-invalid");
        selectAddressField.classList.remove("is-valid");
        selectAddressInput = false;
    } else {
        selectAddressField.classList.add("is-valid");
        selectAddressField.classList.remove("is-invalid");
        selectAddressInput = true;
    }
};

selectAddressField.addEventListener("keyup", check);
selectAddressField.addEventListener("blur", check);

selectAddressForm.addEventListener("submit", (e) => {
    if(!selectAddressInput) {
        e.preventDefault();
    }
});