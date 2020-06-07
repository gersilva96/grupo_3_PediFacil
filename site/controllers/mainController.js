const fs = require("fs");

//Funciones públicas
let mainController = {
    home: (req,res) => {res.render('index', {title:'Home | Pedí Fácil'})},
    login: (req,res) => {res.render('login', {title:'Login | Pedí Fácil'})},
    register: (req,res) => {res.render('register', {title:'Registrarse | Pedí Fácil'})}
}

module.exports = mainController;