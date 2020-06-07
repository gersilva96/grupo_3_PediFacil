const fs = require("fs");

//Funciones públicas
let adminController = {
    list: (req,res) => {res.render('admin/productList', {title:'Admin: Productos | Pedí Fácil'})},
    add: (req,res) => {res.render('admin/productAdd', {title:'Admin: Agregar | Pedí Fácil'})},
    edit: (req,res) => {res.render('admin/productEdit', {title:'Admin: Editar | Pedí Fácil'})}
}

module.exports = adminController;