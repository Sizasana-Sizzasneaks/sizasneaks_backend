var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Check Credential
//const checkCredential = require("../controllers/user/functions/checkCredential.js");


//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//Add product to Cart
const postCart = require("../cart/postCart");
const ProductModel = require("../models/product.js");
const addToCart = require("../cart/addToCart.js");
router.post(
  "/:product_id",
  handleCredentialClaims,
  verifyUserIdToken, 
   addToCart

  // function(req, res,next){
  //   var product_id = req.params.product_id;
  //   var cart = new cart(req.session.cart ? req.session.cart : {});
  //   ProductModel.findById(product_id, function(err, products){
  //     if (err){
  //       return res.redirect('/');
  //     }
  //     cart.add(products, product_id);
  //     req,session.cart = cart; //storing in session
  //     console.log(req.session.cart);
  //     res.redirect('/');
  //   })
  // }
 
);

module.exports = router;