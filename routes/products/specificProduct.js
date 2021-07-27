var express = require("express");
const router = express.Router();


//Get Products model
const { Product } = require('../../models/Product.js');





//Get Specific Product
const getSpecificProduct = require("../../controllers/products/getSpecificProduct.js");
router.get("/:id",getSpecificProduct);






module.exports = router;