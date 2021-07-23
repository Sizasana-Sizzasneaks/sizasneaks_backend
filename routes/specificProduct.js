var express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

//Get Products model
const { Product } = require('../models/product');





//Get Specific Product
const getSpecificProduct = require("../controllers/products/getSpecificProduct.js");
router.get("/:id",getSpecificProduct);






module.exports = router;