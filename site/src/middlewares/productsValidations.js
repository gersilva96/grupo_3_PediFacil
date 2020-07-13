const {check, validationResult, body} = require("express-validator");

const productsValidations = [
    check("name")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el nombre del producto")
        .isLength({min: 10, max: 100}).withMessage("El nombre del producto debe tener al menos 10 caracteres y 100 como máximo"),
    check("code")
        .exists().withMessage("Error de seguridad")
        .trim()
        .isInt({no_symbols: true}).withMessage("El código solo puede ser numérico, no puede contener otros caracteres")
        .isInt({min: 1}).withMessage("El código del producto no puede ser 0")
        .notEmpty().withMessage("Debe ingresar el código del producto"),
    check("category")
        .exists().withMessage("Error de seguridad")
        .notEmpty().withMessage("Debe seleccionar la categoría")
        .isInt({no_symbols:true, min: 1}).withMessage("El id de la categoría debe ser un número"),
    check("price")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el precio")
        .isFloat({no_symbols: true}).withMessage("El precio solo puede ser numérico, no puede contener otros caracteres")
        .isFloat({min: 1}).withMessage("El precio no puede ser 0"),
    check("discount")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el descuento")
        .isFloat({no_symbols: true}).withMessage("El descuento solo puede ser numérico, no puede contener otros caracteres")
        .isFloat({min: 0, max: 99}).withMessage("El descuento no puede ser menor a 0 ni mayor a 99"),
    check("stock")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar el stock")
        .isInt({no_symbols: true}).withMessage("El stock solo puede ser numérico, no puede contener otros caracteres")
        .isInt({min: 0}).withMessage("El stock no puede ser negativo"),
    check("description")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("Debe ingresar la descripción")
        .isLength({min: 10}).withMessage("La descripción debe tener al menos 10 caracteres")
        .isLength({max: 300}).withMessage("La descripción no puede tener más de 300 caracteres")
];

module.exports = productsValidations;