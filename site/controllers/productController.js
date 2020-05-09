const fs = require("fs");
const path = require("path");

//Funciones privadas
let leerHTML = fileName => fs.readFileSync(path.join(`${__dirname}/../views/${fileName}.html`),"utf-8");

//Funciones públicas
let productController = {
    detail: (req,res) => res.send(leerHTML("productDetail")),
    cart: (req,res) => res.send(leerHTML("productCart")),
    add: (req,res) => res.send(leerHTML("productAdd")),
}

module.exports = productController;