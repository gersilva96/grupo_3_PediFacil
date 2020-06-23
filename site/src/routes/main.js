//Llamo a express y a su método router
const express = require("express");
const router = express.Router();

//Llamo al controlador de la ruta home
const mainController = require("../controllers/mainController");

//Obtengo las rutas principales
router.get("/", mainController.home);

//Exporto el contenido de las rutas
module.exports = router;