//Llamo a express y a su método router
const express = require("express");
const router = express.Router();

//Llamo al controlador de la ruta home
const adminController = require("../controllers/adminController");

//Obtengo las rutas principales
router.get("/list", adminController.list);
router.get("/add", adminController.add);
router.get("/edit", adminController.edit);

//Exporto el contenido de las rutas
module.exports = router;