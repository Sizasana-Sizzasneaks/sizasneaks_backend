var express = require("express");
const router = express.Router();







//Get Products Controller & Route
const getProducts = require("../../controllers/products/getProducts.js");
router.get("/",getProducts );










module.exports = router;