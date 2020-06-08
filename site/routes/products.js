//Llamo a express y a su método router
const express = require("express");
const router = express.Router();

//Middlewares
const uploadImgProduct = require("../middlewares/uploadImgProduct");

//Llamo al controlador de la ruta home
const productController = require("../controllers/productController");

//Obtengo las rutas principales
router.get("/search", productController.search);    //GET - Muestra los resultados de búsqueda

router.get("/all-products", productController.root);   //GET - Muestra todos los productos

router.get("/detail/:id", productController.detail);   //GET - Muestra el detalle de un producto

router.get("/cart", productController.cart);   //GET - Muestra el carrito

router.get("/order-history", productController.orderHistory);  //GET - Historial de compra
router.get("/order-history-detail", productController.orderHistoryDetail); //GET - Detalle de historial de compra

router.get("/", productController.list);   //GET - Lista todos los productos

router.get("/create", productController.create);  //GET - Formulario de carga de un producto
router.post("/", uploadImgProduct.uploadFile, productController.store)    //POST - Agrega un producto al JSON

router.get("/:id/edit", productController.edit);   //GET - Formulario de edición de un producto
router.put("/:id", productController.update);  //PUT - Edita un producto del JSON

router.delete("/:id", productController.delete);   //DELETE - Elimina un producto del JSON

//Exporto el contenido de las rutas
module.exports = router;