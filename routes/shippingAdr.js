// var express = require("express");
// const router = express.Router();

// //Helper Functions
 
// //Verify User ID
// const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

// //Handle Credential Claims
// const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

// //Routes & Route Functions

// //Get User Cart
// // const getShippingAddress = require("../controllers/cart/getCart.js");
// // router.get("/", handleCredentialClaims, verifyUserIdToken, getCart);

// //Add Address to a users orders.
// const postShippingAddress = require("../controllers/cart/postShipAdr.js");
// router.post(
//   "/cart_item",
//   handleCredentialClaims,
//   verifyUserIdToken,
//   postShippingAddress
// );

// //Patch a User's Cart Item  (Quantity)
// // const patchShippingAddress= require("../controllers/cart/patchCartItem.js");
// // router.patch(
// //   "/cart_item",
// //   handleCredentialClaims,
// //   verifyUserIdToken,
// //   patchCartItem
// // );

// //Delete a User's Cart Item.
// // const deleteShippingAddress = require("../controllers/cart/deleteCartItem.js");
// // router.delete(
// //   "/cart_item",
// //   handleCredentialClaims,
// //   verifyUserIdToken,
// //   deleteCartItem
// // );

// module.exports = router;
