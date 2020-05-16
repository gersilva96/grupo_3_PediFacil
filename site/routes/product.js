//Llamo a express y a su método router
const express = require("express");
const router = express.Router();

//Llamo al controlador de la ruta home
const productController = require("../controllers/productController");

//Obtengo las rutas principales
router.get("/detail", productController.detail);
router.get("/cart", productController.cart);
router.get("/order-history", productController.orderHistory);
router.get("/order-history-detail", productController.orderHistoryDetail);

//Exporto el contenido de las rutas
module.exports = router;