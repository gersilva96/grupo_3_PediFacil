const productsController = require("./productsController");

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

let mainController = {
    home: (req,res) => {    //GET - Muestro todos los productos en oferta
        const productsTotal = productsController.readJSONFile();
        let products = [];
        productsTotal.forEach(prod => {
            if (prod.discount > 0) {
                products.push(prod);
            }
        });
        let user = undefined;
        if (req.session.userLogged != undefined) {
            user = req.session.userLogged;
        }
        res.render("index", {products, formatPrice, user});
    }
}

module.exports = mainController;