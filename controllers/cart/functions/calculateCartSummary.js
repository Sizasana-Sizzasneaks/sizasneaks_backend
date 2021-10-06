var { FUNDS } = require("../../constants/monetaryConstants.js");

// summary details calculation
async function calculateCartSummary(cart) {
  try {
    // check arguments are not undefined
    if (typeof cart !== "undefined") {
      var cartCount = 0,
        cartTotal = 0,
        cartSummary = {};

      // loop through each cartItem get sellingPrice
      cart.forEach((cartItem) => {
        if (cartItem.available) {
          cartTotal += cartItem.quantity * cartItem.sellingPrice;
          cartCount++;
        }
      });
      cartSummary.cartCount = cartCount;
      cartSummary.cartTotal = cartTotal;
      cartSummary.cart = cart;
      cartSummary.cartDeliveryCharge = FUNDS.DELIVERY_CHARGE;

      return { ok: true, data: cartSummary };
    } else {
      return { ok: false, message: "Cart undefined" };
    }
  } catch {
    return { ok: false, message: "Cart undefined" };
  }
}

module.exports = calculateCartSummary;
