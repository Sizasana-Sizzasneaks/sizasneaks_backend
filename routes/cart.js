var express = require("express");
const router = express.Router();

// verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//get User Cart
const getCart=require("../controllers/cart/getCarts.js");
router.get("/:userId", verifyUserIdToken,handleCredentialClaims, getCart);

//put User Cart
const putCart=require("../controllers/cart/putCart.js");
router.put("/:userId", verifyUserIdToken,handleCredentialClaims, putCart);

module.exports=router;