const express = require("express");
const router = express.Router();

//Middlewares
const uploadAvatarUser = require("../middlewares/uploadAvatarUser");    //Valida que el archivo que se suba sea una imagen png, jpg o jpeg
const usersValidations = require("../middlewares/usersValidations");    //Valida los campos del formulario de login y registro de un usuario
const loggedUser = require("../middlewares/loggedUser");        //Valida que exista un usuario logueado en la sesión
const notLoggedUser = require("../middlewares/notLoggedUser");  //Valida que no exista un usuario logueado en la sesión
const isAdmin = require("../middlewares/isAdmin");      //Valida que el usuario logueado sea administrador

const usersController = require("../controllers/usersController");

router.get("/:id/profile", loggedUser, usersController.profile);    //GET - Muestra el perfil de un usuario - Debe haber un usuario logueado

router.get("/login", notLoggedUser, usersController.login);     //GET - Muestra el formulario de Login - No debe haber un usuario logueado
router.post("/login", usersValidations.loginUser, usersController.processLogin);     //POST - Loguea a un usuario

router.post("/logout", loggedUser, usersController.logout); //POST - Cierra la sesión del usuario logueado - Debe haber un usuario logueado

router.get("/register", notLoggedUser, usersController.register);   //GET - Muestra el formulario de Registro - No debe haber un usuario logueado
router.post("/register",uploadAvatarUser.uploadFile, usersValidations.registerUser, usersController.create);    //POST - Registra a un nuevo usuario

module.exports = router;