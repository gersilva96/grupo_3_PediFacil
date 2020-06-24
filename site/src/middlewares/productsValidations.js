const {check, validationResult, body} = require("express-validator");

const productsValidations = [
    check("name")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el nombre del producto")
        .isLength({min: 10, max: 99}).withMessage("El nombre del producto debe tener al menos 10 caracteres y 99 como máximo"),
    check("category")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar la categoría"),
    check("price")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el precio")
        .isFloat({no_symbols: true}).withMessage("El precio solo puede ser numérico, no puede contener otros caracteres"),
    check("discount")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el descuento")
        .isFloat({no_symbols: true}).withMessage("El descuento solo puede ser numérico, no puede contener otros caracteres")
        .isFloat({min: 0, max: 100}).withMessage("El descuento no puede ser menor a 0 ni mayor a 100"),
    check("stock")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el stock")
        .isInt({no_symbols: true}).withMessage("El stock solo puede ser numérico, no puede contener otros caracteres"),
    check("description")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar la descripción")
        .isLength({min: 10}).withMessage("La descripción debe tener al menos 10 caracteres")
];

module.exports = productsValidations;