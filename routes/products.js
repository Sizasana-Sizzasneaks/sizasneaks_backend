var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Check Credential
//const checkCredential = require("../controllers/user/functions/checkCredential.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//Get Products Controller & Route
const getProducts = require("../controllers/products/getProducts.js");
router.get("/", handleCredentialClaims, verifyUserIdToken, getProducts);

//Get Specific Product
const getProduct = require("../controllers/products/getProduct.js");
router.get(
  "/:productId",
  handleCredentialClaims,
  verifyUserIdToken,
  getProduct
);

//Update a Specific Product
const putProduct = require("../controllers/products/putProduct.js");
router.put(
  "/:productId",
  handleCredentialClaims,
  verifyUserIdToken,
  putProduct
);

//Create product Controller & Route
const postProduct = require("../controllers/products/postProduct.js");
router.post("/", handleCredentialClaims, verifyUserIdToken, postProduct);

//Get list of Product Brands
const getProductBrands = require("../controllers/products/getProductBrands.js");
router.get(
  "/brands/list",
  handleCredentialClaims,
  verifyUserIdToken,
  getProductBrands
);

module.exports = router;
