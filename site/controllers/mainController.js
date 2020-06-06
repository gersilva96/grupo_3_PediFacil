const fs = require("fs");

//Funciones privadas
let leerHTML = fileName => fs.readFileSync(`${__dirname}/../views/${fileName}.html`,"utf-8");

//Funciones públicas
let mainController = {
    home: (req,res) => {
        res.render("index");
    },
}

module.exports = mainController;