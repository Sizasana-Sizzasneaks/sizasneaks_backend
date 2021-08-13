const mongoose = require("mongoose");
const retrieveUserDetails = require("../../user/functions/retrieveUserDetails.js");
const Customer = require("../../../models/Customer.js");


async function createCartItem( userId, product_id, totalQ, option, imageURls, sellingPrice) {
  console.log("add to cart");

  if (
    typeof product_id !== "undefined" &&
    typeof userId !== "undefined" &&
    typeof totalQ.body !== "undefined" &&
    typeof totalQ.quantity !== "undefined"
  ) {
    var retrieveUserDetailsResult = await retrieveUserDetails(userId, {
      firstName: 1,
      lastName: 1,
      isAnonymous: 1,
      _id: 0,
    });

    if (retrieveUserDetailsResult.ok === true) {
      console.log(retrieveUserDetailsResult);

      if (retrieveUserDetailsResult.data.isAnonymous === false) {
        var shoppingCartItem = {
          product_id: "6101340adc7a0305bc700015",
          quantity: 3,
          option: {color:"Red", size:7},
          imageURls: "https://firebasestorage.googleapis.com/v0/b/sizasana-ecommerce-platfor...",
          sellingPrice: 5599,
        };

        Customer.findOneAndUpdate(
          { userId: req.body.id },
          { $push: { cart: shoppingCartItem } }
        );

        return Customer.save()
          .then(() => {
            return { ok: true, message: "Added to cart !" };
          })
          .catch((error) => {
            console.log(error);
            return { ok: false, message: "Failed To Add To Cart" };
          });
      }
    }

    //for the anonymous user

    if (retrieveUserDetailsResult.ok === true) {
      console.log(retrieveUserDetailsResult);

      if (retrieveUserDetailsResult.data.isAnonymous === true) {
        var shoppingCartItem = {
          product_id: product_id,
          quantity: totalQ.quantity,
          option: option,
          imageURls: imageURls,
          sellingPrice: sellingPrice,
        };

        Customer.findOneAndUpdate(
          { userId: req.body.id },
          { $push: { cart: shoppingCartItem } }
        );


        return cart
          .save()
          .then(() => {
            return { ok: true, message: "Added to cart !" };
          })
          .catch((error) => {
            console.log(error);
            return { ok: false, message: "Failed To Add To Cart" };
          });
      }
    }

    //
    else {
      return { ok: false, message: "Failed to Retrieve Customer details" };
    }
  } else {
    return { ok: false, message: "Insufficient data supplied" };
  }
}

module.exports = createCartItem;
