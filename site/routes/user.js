//Llamo a express y a su método router
const express = require("express");
const router = express.Router();

//Llamo al controlador de la ruta home
const userController = require("../controllers/userController");

//Obtengo las rutas principales
router.get("/login", userController.login);
router.post("/login", userController.processLogin);

router.get("/register", userController.register);
router.post("/register", userController.create);

//Exporto el contenido de las rutas
module.exports = router;