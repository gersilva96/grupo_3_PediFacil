const express = require("express");
const router = express.Router();

//Middlewares
const uploadAvatarUser = require("../middlewares/uploadAvatarUser");
const usersValidations = require("../middlewares/usersValidations");

const usersController = require("../controllers/usersController");

router.get("/:id/profile", usersController.profile);    //GET - Muestra el perfil de un usuario

router.get("/login", usersController.login);     //GET - Muestra el formulario de Login
router.post("/login", usersValidations.loginUser, usersController.processLogin);     //POST - Loguea a un usuario

router.get("/register", usersController.register);   //GET - Muestra el formulario de Registro
router.post("/register",uploadAvatarUser.uploadFile, usersValidations.registerUser, usersController.create);    //POST - Registra a un nuevo usuario

module.exports = router;