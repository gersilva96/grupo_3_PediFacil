const db = require("../database/models");

const addToCartQuantity = async (req, res, next) => {
    try {
        const product = await db.Products.findOne({
            where: {
                id: req.params.id
            }
        });
        if (req.body.quantity > product.stock || req.body.quantity < 0) {
            res.render("error", {message: "La cantidad ingresada es mayor al stock disponible", user: req.session.userLogged});
        } else {
            next();
        }
    } catch(error) {
        res.render("error", {message: error, user: req.session.userLogged});
    }
};

module.exports = addToCartQuantity;