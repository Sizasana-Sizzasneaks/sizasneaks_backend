var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Check Credential
const checkCredential = require("../controllers/user/functions/checkCredential.js");

//Get Products Controller & Route
const getProducts = require("../controllers/products/getProducts.js");
router.get("/", verifyUserIdToken, checkCredential, getProducts);

//Get Specific Product
const getProduct = require("../controllers/products/getProduct.js");
router.get("/:productId", verifyUserIdToken, checkCredential, getProduct);

module.exports = router;
