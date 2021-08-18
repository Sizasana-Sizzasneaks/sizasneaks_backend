const Customer = require("../../../models/Customer.js");

//This function Performs the act of updating the quantity of a cart item within
//a user's shopping cart.
function updateCartItemQuantity(userId, cartItem_id, newQuanity) {
  if (
    // checks that the argument is not undefined
    typeof userId !== "undefined" &&
    typeof cartItem_id !== "undefined" &&
    typeof newQuanity !== "undefined"
  ) {

    // using Moongose API to update users cartItem 
    // $set refers to actual updating 
    return Customer.updateOne(
      {
        userId: userId,

        "cart._id": cartItem_id,
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
