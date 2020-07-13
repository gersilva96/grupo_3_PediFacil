const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/", mainController.home);   //GET - Muestra todos los productos en oferta

module.exports = router;