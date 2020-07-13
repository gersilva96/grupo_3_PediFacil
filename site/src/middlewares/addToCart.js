const {check, validationResult, body} = require("express-validator");

const addToCart = [
    check("quantity")
        .exists().withMessage("Error de seguridad")
        .trim()
        .isInt({no_symbols: true}).withMessage("La cantidad debe ser un número, no puede contener otros caracteres")
];

module.exports = addToCart;