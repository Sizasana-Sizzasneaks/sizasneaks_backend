var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//Route to get a list of the top selling products (5) by unit sales for the past month.
const getTopProducts = require("../controllers/revenue/getTopProducts.js");
router.get(
  "/top_products",
  handleCredentialClaims,
  verifyUserIdToken,
  getTopProducts
);

const getUnitsSold = require("../controllers/revenue/getUnitsSold.js");
router.get("/units_sold", getUnitsSold);

module.exports = router;
