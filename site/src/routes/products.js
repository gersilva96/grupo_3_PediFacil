const express = require("express");
const router = express.Router();

//Middlewares
const uploadImgProduct = require("../middlewares/uploadImgProduct");
const productsValidations = require("../middlewares/productsValidations");
const loggedUser = require("../middlewares/loggedUser");
const notLoggedUser = require("../middlewares/notLoggedUser");
const isAdmin = require("../middlewares/isAdmin");

const productsController = require("../controllers/productsController");

router.get("/search", productsController.search);    //GET - Muestra los resultados de búsqueda

router.get("/all-products", productsController.root);   //GET - Muestra todos los productos

router.get("/detail/:id", productsController.detail);   //GET - Muestra el detalle de un producto

router.get("/cart", loggedUser, productsController.cart);   //GET - Muestra el carrito

router.get("/order-history", loggedUser, productsController.orderHistory);  //GET - Historial de compra
router.get("/order-history-detail", loggedUser, productsController.orderHistoryDetail); //GET - Detalle de historial de compra

router.get("/", loggedUser, isAdmin, productsController.list);   //GET - Lista todos los productos

router.get("/create", loggedUser, isAdmin, productsController.create);  //GET - Formulario de carga de un producto
router.post("/", loggedUser, isAdmin, uploadImgProduct.uploadFile, productsValidations, productsController.store)    //POST - Agrega un producto al JSON

router.get("/:id/edit", loggedUser, isAdmin, productsController.edit);   //GET - Formulario de edición de un producto
router.put("/:id", loggedUser, isAdmin, productsValidations, productsController.update);  //PUT - Edita un producto del JSON

router.delete("/:id", loggedUser, isAdmin, productsController.delete);   //DELETE - Elimina un producto del JSON

module.exports = router;