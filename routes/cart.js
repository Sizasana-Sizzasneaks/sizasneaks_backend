var express = require("express");
const router = express.Router();

// verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//get User Cart
const getCart = require("../controllers/cart/getCart.js");
router.get("/", handleCredentialClaims, verifyUserIdToken, getCart);

//put User Cart
const putCart = require("../controllers/cart/putCart.js");
// router.put("/:userId", verifyUserIdToken,handleCredentialClaims, putCart);

//Add product to Cart
const postToCart = require("../controllers/cart/putCartItem.js");
router.put("/",handleCredentialClaims, verifyUserIdToken, postToCart );

module.exports = router;

