const retrieveCartByUserId = require("./retreiveCartByUserId.js");

async function matchCartItem(userId, product_id, option) {
  try {
    if (
      typeof userId !== "undefined" &&
      typeof product_id !== "undefined" &&
      typeof option !== "undefined"
    ) {
      var retrieveCartByUserIdResult = await retrieveCartByUserId(userId);

      if (retrieveCartByUserIdResult.ok === true) {
        var cart = retrieveCartByUserIdResult.data;

        for (var i = 0; i < cart.length; i++) {
          if (
            product_id === cart[i].product_id &&
            option.color === cart[i].option.color &&
            option.size === cart[i].option.size
          ) {
            console.log("Match Found");
            console.log(cart[i]);
            return { ok: true, data: cart[i] };
          }
        }

        return { ok: false, message: "No matching product found." };
      } else {
        return retrieveCartByUserIdResult;
      }
    }
  } catch (error) {
    return {
      ok: false,
      message:
        "matchCartItem: Unknown Error When Looking for Matching Product.",
    };
  }
}

module.exports = matchCartItem;
