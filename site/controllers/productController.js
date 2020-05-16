const fs = require("fs");
const path = require("path");

//Funciones privadas
let leerHTML = fileName => fs.readFileSync(`${__dirname}/../views/product/${fileName}.html`,"utf-8");

//Funciones públicas
let productController = {
    cart: (req,res) => res.send(leerHTML("productCart")),
    detail: (req,res) => res.send(leerHTML("productDetail")),
    orderHistory: (req,res) => res.send(leerHTML("productOrderHistory")),
    orderHistoryDetail: (req,res) => res.send(leerHTML("productOrderHistoryDetail"))
}

module.exports = productController;