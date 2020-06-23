const productsController = require("./productsController");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand((price*(1-(discount/100))).toFixed(2));

let mainController = {
    home: (req,res) => {
        const productsTotal = productsController.readJSONFile();
        let products = [];
        productsTotal.forEach(prod => {
            if (prod.discount > 0) {
                products.push(prod);
            }
        });
        res.render("index", {products, formatPrice});
    }
}

module.exports = mainController;