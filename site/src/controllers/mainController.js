const db = require("../database/models");
const {Op} = require("sequelize");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => {
    let priceDot;
    if (discount == undefined) {
        priceDot = toThousand(price.toFixed(2));
    } else {
        priceDot = toThousand((price*(1-(discount/100))).toFixed(2));
    }
    let first = priceDot.slice(0,-3);
    let last = priceDot.slice(-3);
    let lastReplaced = last.replace(".", ",");
    return `$ ${first}${lastReplaced}`;
};

const mainController = {
    home: async (req, res) => {    //GET - Muestra todos los productos en oferta
        try {
            const products = await db.Products.findAll({
                where: {
                    discount: {
                        [Op.gt]: 0
                    }
                }
            });
            return res.render("index", {products, formatPrice, user: req.session.userLogged});
        } catch(error) {
            return res.render("error", {message: error, user: req.session.userLogged})
        }
    }
}

module.exports = mainController;