const express = require("express");
const router = express.Router();

//Middlewares
const loggedUser = require("../middlewares/loggedUser");
const isBuyer = require("../middlewares/isBuyer");
const addToCart = require("../middlewares/addToCart");
const addToCartQuantity = require("../middlewares/addToCartQuantity");
const selectAddress = require("../middlewares/selectAddress");
const addressValidation = require("../middlewares/addressValidation");
const addressInSession = require("../middlewares/addressInSession");
const orderDescriptionValidation = require("../middlewares/orderDescriptionValidation");

const cartController = require("../controllers/cartController");

router.get("/", loggedUser, isBuyer, cartController.cart);   //GET - Muestra el carrito - Debe haber un usuario logueado

router.post("/add/:id", loggedUser, isBuyer, addToCart, addToCartQuantity, cartController.add);     //POST - Agrega un producto al carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.put("/add/:id", loggedUser, isBuyer, addToCart, addToCartQuantity, cartController.update);        //PUT - Actualiza un producto del carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.delete("/delete/:id", loggedUser, isBuyer, cartController.delete);        //DELETE - Elimina un producto del carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.delete("/clean", loggedUser, isBuyer, cartController.clean);        //DELETE - Vacía el carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.get("/select-address", loggedUser, isBuyer, selectAddress, cartController.select);       //GET - Muestra las direcciones usadas anteriormente y un botón para agregar una nueva - Debe haber un usuario logueado - Debe tener rol de comprador - Debe tener al menos una dirección cargada con anterioridad

router.get("/add-address", loggedUser, isBuyer, cartController.address);        //GET - Muestra el formulario de agregar dirección para la compra - Debe haber un usuario logueado - Debe tener rol de comprador

router.post("/add-new-address", loggedUser, isBuyer, addressValidation.new, cartController.newAddress);        //POST - Guarda una nueva dirección en session - Debe haber un usuario logueado - Debe tener rol de comprador

router.post("/add-existing-address", loggedUser, isBuyer, addressValidation.existing, cartController.existingAddress);     //POST - Guarda una dirección existente en session - Debe haber un usuario logueado - Debe tener rol de comprador

router.get("/finally", loggedUser, isBuyer, addressInSession, cartController.finally);      //GET  - Muestra el resumen de compra antes de finalizarla - Debe haber un usuario logueado - Debe tener rol de administrador - Debe haber una dirección en session

router.post("/purchase", loggedUser, isBuyer, addressInSession, orderDescriptionValidation, cartController.purchase);       //POST - Ejecuta la compra - Debe haber un usuario logueado - Debe tener rol de comprador - Debe haber una dirección en session

router.post("/repeat-purchase/:id", loggedUser, isBuyer, cartController.repeatPurchase);    //POST - Repite una compra anterior si hay stock suficiente - Debe haber un usuario logueado - Debe tener rol de comprador

module.exports = router;