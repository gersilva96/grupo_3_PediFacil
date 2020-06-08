const productController = require("./productController");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

let mainController = {
    home: (req,res) => {
        const productsTotal = productController.readJSONFile();
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