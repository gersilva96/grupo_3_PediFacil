const fs = require("fs");

//Funciones públicas
let productController = {
    cart: (req,res) => {res.render('product/productCart', {title:'Carrito | Pedí Fácil'})},
    detail: (req,res) => {res.render('product/productDetail', {title:'Detalle de Pedidos | Pedí Fácil'})},
    orderHistory: (req,res) => {res.render('product/productOrderHistory', {title:'Historial de Pedidos | Pedí Fácil'})},
    orderHistoryDetail: (req,res) => {res.render('product/productOrderHistoryDetail', {title:'Historial de Pedidos | Pedí Fácil'})}
}

module.exports = productController;