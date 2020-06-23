//Llamo a express y a su método router
const express = require("express");
const router = express.Router();

//Middlewares
const uploadAvatarUser = require("../middlewares/uploadAvatarUser");

//Llamo al controlador de la ruta home
const usersController = require("../controllers/usersController");

//Obtengo las rutas principales
router.get("/login", usersController.login);     //GET - Muestra el formulario de Login
router.post("/login", usersController.processLogin);     //POST - Loguea a un usuario

router.get("/register", usersController.register);   //GET - Muestra el formulario de Registro
router.post("/register",uploadAvatarUser.uploadFile, usersController.create);    //POST - Registra a un nuevo usuario

//Exporto el contenido de las rutas
module.exports = router;