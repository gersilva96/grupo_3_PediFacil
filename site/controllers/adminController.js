const fs = require("fs");

//Funciones privadas
let leerHTML = fileName => fs.readFileSync(`${__dirname}/../views/admin/${fileName}.html`,"utf-8");

//Funciones públicas
let adminController = {
    list: (req,res) => res.send(leerHTML("productList")),
    add: (req,res) => res.send(leerHTML("productAdd")),
    edit: (req,res) => res.send(leerHTML("productEdit"))
}

module.exports = adminController;