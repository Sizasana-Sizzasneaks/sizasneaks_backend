var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");



//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//Add product to Cart
const postToCart = require("../controllers/cart/postCartItem");
router.post(
  "/:userId",
  handleCredentialClaims,
  verifyUserIdToken, 
   postToCart 
);

module.exports = router;