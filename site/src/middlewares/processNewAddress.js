const { validationResult } = require("express-validator");
const db = require("../database/models");

const processNewAddress = async (req, res, next) => {
    const errors = validationResult(req);
        if (errors.isEmpty()) {
            await db.Addresses.create({
                first_line: req.body.first_line,
                second_line: req.body.second_line,
                between_streets: req.body.between_streets,
                city: req.body.city,
                phone: req.body.phone,
                user_id: req.session.userLogged.id
            });
            const address = await db.Addresses.findOne({
                where: {user_id: req.session.userLogged.id},
                order: [["createdAt", "DESC"]]
            });
            req.session.selectedAddressId = address.id;
            next();
        } else {
            res.render("cart/addAddress", {errors: errors.errors, user: req.session.userLogged});
        }
};

module.exports = processNewAddress;