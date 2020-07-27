const productForm = document.getElementById("product_form");
const productFormFields = productForm.querySelectorAll(".form-control");

const productRegEx = {
    name: /^[a-zA-Z0-9À-ÿ\.\_\-\s]{10,100}$/,
    code: /^[0-9]+$/,
    category: /^[0-9]{1,2}$/,
    price: /^[0-9]+([\.]{1,1}[0-9]{1,2})?$/,
    discount: /^[0-9]{1,2}$/,
    stock: /^[0-9]+$/,
    description: /^.{10,300}$/
};

const productInputs = {
    name: false,
    code: false,
    category: false,
    price: false,
    discount: false,
    stock: false,
    description: false
};

const productCheckForm = (e) => {
    switch(e.target.name) {
        case "name":
            productCheckField(productRegEx.name, e.target);
            break;
        case "code":
            productCheckField(productRegEx.code, e.target);
            break;
        case "category":
            productCheckField(productRegEx.category, e.target);
            break;
        case "price":
            productCheckField(productRegEx.price, e.target);
            break;
        case "discount":
            productCheckField(productRegEx.discount, e.target);
            break;
        case "stock":
            productCheckField(productRegEx.stock, e.target);
            break;
        case "description":
            productCheckField(productRegEx.description, e.target);
            break;
    }
};

const productCheckField = (regex, inputname) => {
    let input;
    if (typeof(inputname) == "string") {
        input = document.getElementById(inputname);
    } else {
        input = inputname;
    }
    if (!regex.test(input.value)) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        productInputs[input.id] = false;
        if (input.id == "price" || input.id == "discount") {
            input.parentElement.classList.add("is-invalid");
            input.parentElement.classList.remove("is-valid");
        }
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        productInputs[input.id] = true;
        if (input.id == "price" || input.id == "discount") {
            input.parentElement.classList.add("is-valid");
            input.parentElement.classList.remove("is-invalid");
        }
    }
};

productFormFields.forEach(input => {
    input.addEventListener("keyup", productCheckForm);
    input.addEventListener("blur", productCheckForm);
});

productForm.addEventListener("submit", (e) => {
    productCheckField(productRegEx.name, "name");
    productCheckField(productRegEx.code, "code");
    productCheckField(productRegEx.category, "category");
    productCheckField(productRegEx.price, "price");
    productCheckField(productRegEx.discount, "discount");
    productCheckField(productRegEx.stock, "stock");
    productCheckField(productRegEx.description, "description");
    for (const input in productInputs) {
        if (!productInputs[input]) {
            e.preventDefault();
        }
    }
    console.log(productInputs)
});