const express = require("express");
const router = express.Router();

//Middlewares
const loggedUser = require("../middlewares/loggedUser");
const isBuyer = require("../middlewares/isBuyer");
const addToCart = require("../middlewares/addToCart");
const addToCartQuantity = require("../middlewares/addToCartQuantity");

const cartController = require("../controllers/cartController");

router.get("/", loggedUser, isBuyer, cartController.cart);   //GET - Muestra el carrito - Debe haber un usuario logueado

router.post("/add/:id", loggedUser, isBuyer, addToCart, addToCartQuantity, cartController.add);     //POST - Agrega un producto al carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.put("/add/:id", loggedUser, isBuyer, addToCart, addToCartQuantity, cartController.update);        //PUT - Actualiza un producto del carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.delete("/delete/:id", loggedUser, isBuyer, cartController.delete);        //DELETE - Elimina un producto del carrito - Debe haber un usuario logueado - Debe tener rol de comprador

router.delete("/clean", loggedUser, isBuyer, cartController.clean);        //DELETE - Vacía el carrito - Debe haber un usuario logueado - Debe tener rol de comprador

module.exports = router;