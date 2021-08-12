var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");


//Delete Reviews Controller & Route
const deleteCartItem = require("../controllers/cart/deleteCartItem.js");
router.delete("/:product_id", handleCredentialClaims, verifyUserIdToken, deleteCartItem);

module.exports = router;
