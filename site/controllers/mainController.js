const fs = require("fs");

//Funciones privadas
let leerHTML = fileName => fs.readFileSync(`${__dirname}/../views/${fileName}.html`,"utf-8");

//Funciones públicas
let mainController = {
    home: (req,res) => res.send(leerHTML("index")),
    login: (req,res) => res.send(leerHTML("login")),
    register: (req,res) => res.send(leerHTML("register"))
}

module.exports = mainController;