const mongoose = require("mongoose");
const Customer = require("../../../models/Customer.js");

async function createCartItem(userId, product_id, variant) {
  console.log("add to cart");

  if (
    typeof product_id !== "undefined" &&
    typeof userId !== "undefined" &&
    typeof variant !== "undefined"
  ) {
    var shoppingCartItem = {
      product_id: product_id,
      quantity: 1,
      option: variant,
    };
    return Customer.findOneAndUpdate(
      { userId: userId },
      { $push: { "cart": shoppingCartItem } }
    ).then(() => {
        return { ok: true, message: "Added to cart !" };
      })
      .catch((error) => {
        console.log(error);
        return { ok: false, message: "Failed To Add To Cart" };
      });
  } else {
    return { ok: false, message: "Insufficient data supplied" };
  }
}

module.exports = createCartItem;
