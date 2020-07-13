const express = require("express");
const router = express.Router();

//Middlewares
const uploadImgProduct = require("../middlewares/uploadImgProduct");    //Valida que el archivo que se suba sea una imagen png, jpg o jpeg
const productsValidations = require("../middlewares/productsValidations");      //Valida los campos del formulario de carga de un producto
const loggedUser = require("../middlewares/loggedUser");    //Valida que exista un usuario logueado en la sesión
const notLoggedUser = require("../middlewares/notLoggedUser");  //Valida que no exista un usuario logueado en la sesión
const isAdmin = require("../middlewares/isAdmin");      //Valida que el usuario logueado sea administrador
const isSeller = require("../middlewares/isSeller");    //Valida que el usuario logueado sea vendedor
const isBuyer = require("../middlewares/isBuyer");    //Valida que el usuario logueado sea comprador

const productsController = require("../controllers/productsController");

router.get("/search", productsController.search);    //GET - Muestra los resultados de búsqueda

router.get("/all-products", productsController.root);   //GET - Muestra todos los productos

router.get("/detail/:id", productsController.detail);   //GET - Muestra el detalle de un producto

router.get("/order-history", loggedUser, isBuyer, productsController.orderHistory);  //GET - Historial de compra - Debe haber un usuario logueado - Debe tener rol de comprador
router.get("/order-history-detail", loggedUser, isBuyer, productsController.orderHistoryDetail); //GET - Detalle de historial de compra - Debe haber un usuario logueado - Debe tener rol de comprador

router.get("/", loggedUser, isSeller, productsController.list);   //GET - Lista todos los productos - Debe haber un usuario logueado - Debe tener rol de vendedor

router.get("/create", loggedUser, isSeller, productsController.create);  //GET - Formulario de carga de un producto - Debe haber un usuario logueado - Debe tener rol de vendedor
router.post("/", loggedUser, isSeller, uploadImgProduct.uploadFile, productsValidations, productsController.store);    //POST - Agrega un producto - Debe haber un usuario logueado - Debe tener rol de vendedor

router.get("/:id/edit", loggedUser, isSeller, productsController.edit);   //GET - Formulario de edición de un producto - Debe haber un usuario logueado - Debe tener rol de vendedor
router.put("/:id", loggedUser, isSeller, productsValidations, productsController.update);  //PUT - Actualiza un producto - Debe haber un usuario logueado - Debe tener rol de vendedor

router.delete("/:id", loggedUser, isSeller, productsController.delete);   //DELETE - Elimina un producto - Debe haber un usuario logueado - Debe tener rol de vendedor

module.exports = router;