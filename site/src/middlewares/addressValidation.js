const { check } = require("express-validator");

const addressValidation = {
    new: [
        check("street")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({min: 2, max: 50}).withMessage("El nombre de la calle debe tener al menos 2 caracteres, máximo 50")
            .notEmpty().withMessage("Debe ingresar el nombre de la calle"),
        check("number")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isInt({no_symbols: true}).withMessage("El número de la dirección no puede contener símbolos")
            .isInt({min:1, max: 999999}).withMessage("El número de la dirección no puede ser negativo ni tener más de 6 cifras")
            .notEmpty().withMessage("Debe ingresar el número de la dirección"),
        check("floor")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({max: 40}).withMessage("El piso no puede contener más de 40 caracteres"),
        check("apartment")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({max: 40}).withMessage("El departamento no puede contener más de 40 caracteres"),
        check("between_streets")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({max: 100}).withMessage("El campo entre calles no puede contener más de 100 caracteres"),
        check("city")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({max: 50}).withMessage("La ciudad no puede contener más de 50 caracteres")
            .notEmpty().withMessage("Debe ingresar la ciudad"),
        check("province")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({max: 50}).withMessage("La provincia no puede contener más de 50 caracteres")
            .notEmpty().withMessage("Debe ingresar la provincia"),
        check("phone")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isInt({no_symbols: true, max: 1.8446744e+19}).withMessage("El número ingresado es inválido")
            .notEmpty().withMessage("Debe ingresar un número de teléfono")
    ],
    existing: [
        check("selected_address")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isInt({no_symbols: true}).withMessage("Id de dirección inválido")
            .isInt({min: 1}).withMessage("El id de la dirección no puede ser menor a 1")
            .notEmpty().withMessage("El id de la dirección debe existir")
    ]
};

module.exports = addressValidation;