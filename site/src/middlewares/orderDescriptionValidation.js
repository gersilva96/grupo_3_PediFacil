const {check} = require("express-validator");

const orderDescriptionValidation = [
    check("order_description")
        .exists().withMessage("Error de seguridad")
        .trim()
        .isLength({max: 100}).withMessage("La descripción no puede tener más de 100 caracteres")
];

module.exports = orderDescriptionValidation;