const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/", mainController.home);   //GET - Muestro todos los productos en oferta

module.exports = router;