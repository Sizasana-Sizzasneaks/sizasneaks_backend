var express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

//Get Products model
const { Product } = require('../models/product');



//Get Products Controller & Route
const getProducts = require("../controllers/products/getProducts.js");
router.get("/",getProducts );










module.exports = router;