const { check } = require("express-validator");

const addressValidation = {
    new: [
        check("first_line")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({max: 50}).withMessage("La primera línea no puede contener más de 50 caracteres")
            .notEmpty().withMessage("Debe ingresar la primera línea de la dirección"),
        check("second_line")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({max: 50}).withMessage("La segunda línea no puede contener más de 50 caracteres"),
        check("between_streets")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({max: 100}).withMessage("El campo entre calles no puede contener más de 100 caracteres"),
        check("city")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isLength({max: 50}).withMessage("La ciudad no puede contener más de 50 caracteres")
            .notEmpty().withMessage("Debe ingresar la ciudad"),
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
            .notEmpty().withMessage("El id de la dirección debe existir")
    ]
};

module.exports = addressValidation;