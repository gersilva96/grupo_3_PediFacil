const express = require("express");
const router = express.Router();

//Middlewares
const loggedUser = require("../middlewares/loggedUser");
const isBuyer = require("../middlewares/isBuyer");
const addToCart = require("../middlewares/addToCart");
const addToCartQuantity = require("../middlewares/addToCartQuantity");
const selectAddress = require("../middlewares/selectAddress");
const addressValidation = require("../middlewares/addressValidation");
const processExistingAddress = require("../middlewares/processExistingAddress");
const processNewAddress = require("../middlewares/processNewAddress");

const cartController = require("../controllers/cartController");

router.get("/", loggedUser, isBuyer, cartController.cart);   //GET - Muestra el carrito - Debe haber un usuario logueado

router.post("/add/:id", loggedUser, isBuyer, addToCart, addToCartQuantity, cartController.add);     //POST - Agrega un producto al carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.put("/add/:id", loggedUser, isBuyer, addToCart, addToCartQuantity, cartController.update);        //PUT - Actualiza un producto del carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.delete("/delete/:id", loggedUser, isBuyer, cartController.delete);        //DELETE - Elimina un producto del carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.delete("/clean", loggedUser, isBuyer, cartController.clean);        //DELETE - Vacía el carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.get("/select-address", loggedUser, isBuyer, selectAddress, cartController.select);       //GET - Muestra las direcciones usadas anteriormente y un botón para agregar una nueva - Debe haber un usuario logueado - Debe tener rol de comprador - Debe tener al menos una dirección cargada con anterioridad

router.get("/add-address", loggedUser, isBuyer, cartController.address);        //GET - Muestra el formulario de agregar dirección para la compra - Debe haber un usuario logueado - Debe tener rol de comprador

router.post("/purchase-wn", loggedUser, isBuyer, addressValidation.new, processNewAddress, cartController.purchase);        //POST - Ejecuta la compra con una dirección nueva - Debe haber un usuario logueado - Debe tener rol de comprador

router.post("/purchase-we", loggedUser, isBuyer, addressValidation.existing, processExistingAddress, cartController.purchase);     //POST - Ejecuta la compra con una dirección ya existente - Debe haber un usuario logueado - Debe tener rol de comprador

module.exports = router;