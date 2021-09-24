const Customer = require("../../../models/Customer.js");

async function clearUserCart(userId) {
  try {
    if (typeof userId !== "undefined") {
      return Customer.updateOne(
        { userId: userId },
        { $set: { cart: [] } },
        { multi: true }
      )
        .then(() => {
          return { ok: true, message: "User cart cleared" };
        })
        .catch(() => {
          return { ok: false, message: "Failed to clear user cart." };
        });
    } else {
      return { ok: false, message: "userId argument not defined" };
    }
  } catch {
    return {
      ok: false,
      message: "Unexpected error when clearing a users cart.",
    };
  }
}

module.exports = clearUserCart;
