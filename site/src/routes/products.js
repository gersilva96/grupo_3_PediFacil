const express = require("express");
const router = express.Router();

//Middlewares
const uploadImgProduct = require("../middlewares/uploadImgProduct");    //Valida que el archivo que se suba sea una imagen png, jpg o jpeg
const productsValidations = require("../middlewares/productsValidations");      //Valida los campos del formulario de carga de un producto
const loggedUser = require("../middlewares/loggedUser");    //Valida que exista un usuario logueado en la sesión
const notLoggedUser = require("../middlewares/notLoggedUser");  //Valida que no exista un usuario logueado en la sesión
const isAdmin = require("../middlewares/isAdmin");      //Valida que el usuario logueado sea administrador

const productsController = require("../controllers/productsController");

router.get("/search", productsController.search);    //GET - Muestra los resultados de búsqueda

router.get("/all-products", productsController.root);   //GET - Muestra todos los productos

router.get("/detail/:id", productsController.detail);   //GET - Muestra el detalle de un producto

router.get("/cart", loggedUser, productsController.cart);   //GET - Muestra el carrito - Debe haber un usuario logueado

router.get("/order-history", loggedUser, productsController.orderHistory);  //GET - Historial de compra - Debe haber un usuario logueado
router.get("/order-history-detail", loggedUser, productsController.orderHistoryDetail); //GET - Detalle de historial de compra - Debe haber un usuario logueado

router.get("/", loggedUser, isAdmin, productsController.list);   //GET - Lista todos los productos - Debe haber un usuario logueado y debe ser admin

router.get("/create", loggedUser, isAdmin, productsController.create);  //GET - Formulario de carga de un producto - Debe haber un usuario logueado y debe ser admin
router.post("/", loggedUser, isAdmin, uploadImgProduct.uploadFile, productsValidations, productsController.store)    //POST - Agrega un producto al JSON - Debe haber un usuario logueado y debe ser admin

router.get("/:id/edit", loggedUser, isAdmin, productsController.edit);   //GET - Formulario de edición de un producto - Debe haber un usuario logueado y debe ser admin
router.put("/:id", loggedUser, isAdmin, productsValidations, productsController.update);  //PUT - Actualiza un producto del JSON - Debe haber un usuario logueado y debe ser admin

router.delete("/:id", loggedUser, isAdmin, productsController.delete);   //DELETE - Elimina un producto del JSON - Debe haber un usuario logueado y debe ser admin

module.exports = router;