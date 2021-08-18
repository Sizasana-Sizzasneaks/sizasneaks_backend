var express = require("express");
const router = express.Router();

//Helper Functions
 
//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//Routes & Route Functions

//Get User Cart
const getCart = require("../controllers/cart/getCart.js");
router.get("/", handleCredentialClaims, verifyUserIdToken, getCart);

//Add product to a users cart.
const postCartItem = require("../controllers/cart/postCartItem.js");
router.post(
  "/cart_item",
  handleCredentialClaims,
  verifyUserIdToken,
  postCartItem
);

//Patch a User's Cart Item  (Quantity)
const patchCartItem = require("../controllers/cart/patchCartItem.js");
router.patch(
  "/cart_item",
  handleCredentialClaims,
  verifyUserIdToken,
  patchCartItem
);

//Delete a User's Cart Item.
const deleteCartItem = require("../controllers/cart/deleteCartItem.js");
router.delete(
  "/cart_item",
  handleCredentialClaims,
  verifyUserIdToken,
  deleteCartItem
);

module.exports = router;
