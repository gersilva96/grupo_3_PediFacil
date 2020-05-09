const fs = require("fs");
const path = require("path");

//Funciones privadas
let leerHTML = fileName => fs.readFileSync(path.join(`${__dirname}/../views/${fileName}.html`),"utf-8");

//Funciones públicas
let mainController = {
    home: (req,res) => res.send(leerHTML("index")),
    login: (req,res) => res.send(leerHTML("login")),
    register: (req,res) => res.send(leerHTML("register"))
}

module.exports = mainController;