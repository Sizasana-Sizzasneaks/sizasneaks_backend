const Customer = require("../../../models/Customer.js");

function updateCartItemQuantity(userId, product_id, option, newQuanity) {
  if (
    // checks that the argument is not undefined
    typeof userId !== "undefined" &&
    typeof product_id !== "undefined" &&
    typeof option !== "undefined" &&
    typeof newQuanity !== "undefined"
  ) {

    // using Moongose API to update users cartItem 
    // $set refers to actual updating 
    return Customer.updateOne(
      {
        userId: userId,
        "cart.product_id": product_id,
        "cart.option": option,
      }, 
      {
        $set: {
          "cart.$.quantity": newQuanity,
        },
      }
    )
      .then(() => {
        return { ok: true, message: "Quantity Changed Successfully" };
      })
      .catch(() => {
        return { ok: false, message: "Quantity Change Failed" };
      });
  } else {
    return { ok: false, message: "Not all arguments were supplied." };
  }
}

module.exports = updateCartItemQuantity;
