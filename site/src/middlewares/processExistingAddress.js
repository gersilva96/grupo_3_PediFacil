const { validationResult } = require("express-validator");
const db = require("../database/models");

const processExistingAddress = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const address = await db.Addresses.findByPk(parseInt(req.body.selected_address));
        if (address.user_id == req.session.userLogged.id) {
            req.session.selectedAddressId = address.id;
            next();
        } else {
            res.render("error", {message: "Estás intentando seleccionar una dirección que no te pertenece", user: req.session.userLogged});
        }
    } else {
        res.render("cart/selectAddress", {errors: errors.errors, user: req.session.userLogged});
    }
};

module.exports = processExistingAddress;