//Llamo a express y a su método router
const express = require("express");
const router = express.Router();

//Middlewares
const uploadImgProduct = require("../middlewares/uploadImgProduct");

//Llamo al controlador de la ruta home
const productsController = require("../controllers/productsController");

//Obtengo las rutas principales
router.get("/search", productsController.search);    //GET - Muestra los resultados de búsqueda

router.get("/all-products", productsController.root);   //GET - Muestra todos los productos

router.get("/detail/:id", productsController.detail);   //GET - Muestra el detalle de un producto

router.get("/cart", productsController.cart);   //GET - Muestra el carrito

router.get("/order-history", productsController.orderHistory);  //GET - Historial de compra
router.get("/order-history-detail", productsController.orderHistoryDetail); //GET - Detalle de historial de compra

router.get("/", productsController.list);   //GET - Lista todos los productos

router.get("/create", productsController.create);  //GET - Formulario de carga de un producto
router.post("/", uploadImgProduct.uploadFile, productsController.store)    //POST - Agrega un producto al JSON

router.get("/:id/edit", productsController.edit);   //GET - Formulario de edición de un producto
router.put("/:id", productsController.update);  //PUT - Edita un producto del JSON

router.delete("/:id", productsController.delete);   //DELETE - Elimina un producto del JSON

//Exporto el contenido de las rutas
module.exports = router;