const mongoose = require("mongoose");

// payment gateway code function
async function orderPayment(userId, orderId, orderToReturn, billingDetails) {
  console.log("");
  try {
    if (
      typeof userId !== "undefined" &&
      typeof orderId !== "undefined" &&
      typeof orderToReturn !== "undefined" &&
      typeof billingDetails !== "undefined"
    ) {
      await setTimeout(() => {}, 1500);
      return { ok: true };
    } else {
      return { ok: false, message: "Insufficient data supplied" };
    }
  } catch (error) {
    return { ok: false, message: "Unexpected error making order payment " };
  }
}

module.exports = orderPayment;
