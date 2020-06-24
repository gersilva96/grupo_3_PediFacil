const express = require("express");
const router = express.Router();

//Middlewares
const uploadAvatarUser = require("../middlewares/uploadAvatarUser");
const usersValidations = require("../middlewares/usersValidations");
const loggedUser = require("../middlewares/loggedUser");
const notLoggedUser = require("../middlewares/notLoggedUser");

const usersController = require("../controllers/usersController");

router.get("/:id/profile", loggedUser, usersController.profile);    //GET - Muestra el perfil de un usuario

router.get("/login", notLoggedUser, usersController.login);     //GET - Muestra el formulario de Login
router.post("/login", usersValidations.loginUser, usersController.processLogin);     //POST - Loguea a un usuario

router.post("/logout", loggedUser, usersController.logout); //POST - Cierra la sesión del usuario activo

router.get("/register", notLoggedUser, usersController.register);   //GET - Muestra el formulario de Registro
router.post("/register",uploadAvatarUser.uploadFile, usersValidations.registerUser, usersController.create);    //POST - Registra a un nuevo usuario

module.exports = router;