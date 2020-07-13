const {check, validationResult, body} = require("express-validator");

const usersValidations = {
    registerUser: [
        check("role")
            .exists().withMessage("Error de seguridad")
            .trim()
            .isInt({no_symbols: true}).withMessage("Error al seleccionar el rol")
            .notEmpty().withMessage("Debe seleccionar un rol"),
        check("business_name")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar el nombre del negocio")
            .isLength({min: 2, max: 50}).withMessage("El nombre del negocio debe tener al menos 2 caracteres, 50 como máximo"),
        check("email")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar un email")
            .isEmail().withMessage("Debe ingresar un email válido")
            .normalizeEmail()
            .isLength({max: 50}).withMessage("El email no puede tener más de 50 caracteres"),
        check("first_name")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar su nombre")
            .isLength({max: 50}).withMessage("Tu nombre no puede tener más de 50 caracteres"),
        check("last_name")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar su apellido")
            .isLength({max: 50}).withMessage("Tu apellido no puede tener más de 50 caracteres"),
        check("password")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar una contraseña")
            .isLength({min: 6, max: 100}).withMessage("La contraseña debe tener al menos 6 caracteres, 100 como máximo"),
        check("password_repeat")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe repetir la contraseña")
            .isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
        body().custom(req => {  //Chequeamos que coincidan las contraseñas ingresadas
            if (req.password === req.password_repeat) {
                return true;
            } else {
                return false;
            }
        }).withMessage("Las contraseñas no coinciden")
    ],
    loginUser: [
        check("email")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar un email")
            .isEmail().withMessage("Debe ingresar un email válido")
            .normalizeEmail(),
        check("password")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar una contraseña")
    ],
    updateUser: [
        check("business_name")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar el nombre del negocio")
            .isLength({min: 2, max: 50}).withMessage("El nombre del negocio debe tener al menos 2 caracteres, 50 como máximo"),
        check("email")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar un email")
            .isEmail().withMessage("Debe ingresar un email válido")
            .normalizeEmail()
            .isLength({max: 50}).withMessage("El email no puede tener más de 50 caracteres"),
        check("first_name")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar su nombre")
            .isLength({max: 50}).withMessage("Tu nombre no puede tener más de 50 caracteres"),
        check("last_name")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar su apellido")
            .isLength({max: 50}).withMessage("Tu apellido no puede tener más de 50 caracteres"),
    ]
};

module.exports = usersValidations;