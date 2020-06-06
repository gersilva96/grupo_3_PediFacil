const fs = require("fs");

//Funciones privadas
let leerHTML = fileName => fs.readFileSync(`${__dirname}/../views/product/${fileName}.html`,"utf-8");

//Funciones públicas
let productController = {
    cart: (req,res) => {
        res.render("productCart");
    },
    detail: (req,res) => {
        res.render("productDetail");
    },
    orderHistory: (req,res) => {
        res.render("productOrderHistory");
    },
    orderHistoryDetail: (req,res) => {
        res.render("productOrderHistoryDetail");
    },
}

module.exports = productController;