const {check} = require("express-validator");

const orderDescriptionValidation = [
    check("order_description")
        .exists().withMessage("Error de seguridad")
        .trim()
        .isLength({max: 50}).withMessage("La descripción no puede tener más de 50 caracteres")
];

module.exports = orderDescriptionValidation;