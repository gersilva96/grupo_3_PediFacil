//Llamo a express y a su método router
const express = require("express");
const router = express.Router();

//Llamo al controlador de la ruta home
const productController = require("../controllers/productController");

//Obtengo las rutas principales
router.get("/", productController.detail);
router.get("/cart", productController.cart);
router.get("/add", productController.add);

//Exporto el contenido de las rutas
module.exports = router;