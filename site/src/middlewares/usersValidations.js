const {check, validationResult, body} = require("express-validator");
const usersController = require("../controllers/usersController");
const bcrypt = require("bcrypt");

const usersValidations = {
    registerUser: [
        check("business_name")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar el nombre del negocio")
            .isLength({min: 2}).withMessage("El nombre del negocio debe tener al menos 2 caracteres"),
        check("email")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar un email")
            .isEmail().withMessage("Debe ingresar un email válido")
            .normalizeEmail(),
        check("first_name")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar su nombre"),
        check("last_name")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar su apellido"),
        check("password")
            .exists().withMessage("Error de seguridad")
            .trim()
            .notEmpty().withMessage("Debe ingresar una contraseña")
            .isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
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
        }).withMessage("Las contraseñas no coinciden"),
        body("email").custom(email => {     //Chequeamos que no haya otro usuario registrado con el mismo email
            const exists = usersController.searchByEmail(email);
            if (exists == null) {
                return true;
            } else {
                return false;
            }
        }).withMessage("Ya existe un usuario con el email ingresado")
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
            .notEmpty().withMessage("Debe ingresar una contraseña"),
        body("email").custom(email => {
            if (usersController.searchByEmail(email)) {
                return true;
            } else {
                return false;
            }
        }).withMessage("No se encuentra un usuario con ese mail"),
        body().custom(req => {
            const user = usersController.searchByEmail(req.email);
            if (user != null && bcrypt.compareSync(req.password, user.password)) {
                return true;
            } else {
                return false;
            }
        }).withMessage("La contraseña ingresada no es correcta")
    ]
};

module.exports = usersValidations;