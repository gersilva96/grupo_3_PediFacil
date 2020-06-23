//Llamo a express y a su método router
const express = require("express");
const router = express.Router();

//Middlewares
const uploadAvatarUser = require("../middlewares/uploadAvatarUser");

//Llamo al controlador de la ruta home
const userController = require("../controllers/userController");

//Obtengo las rutas principales
router.get("/login", userController.login);     //GET - Muestra el formulario de Login
router.post("/login", userController.processLogin);     //POST - Loguea a un usuario

router.get("/register", userController.register);   //GET - Muestra el formulario de Registro
router.post("/register",uploadAvatarUser.uploadFile, userController.create);    //POST - Registra a un nuevo usuario

//Exporto el contenido de las rutas
module.exports = router;