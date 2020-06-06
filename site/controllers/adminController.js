const fs = require("fs");

//Funciones privadas
let leerHTML = fileName => fs.readFileSync(`${__dirname}/../views/admin/${fileName}.html`,"utf-8");

//Funciones públicas
let adminController = {
    list: (req,res) => {
        res.render("productList");
    },
    add: (req,res) => {
        res.render("productAdd");
    },
    edit: (req,res) => {
        res.render("productEdit");
    }
}

module.exports = adminController;