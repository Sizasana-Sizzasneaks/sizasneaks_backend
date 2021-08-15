const Customer = require("../../../models/Customer.js");

//This function Performs the act of updating the quantity of a cart item within
//a user's shopping cart.
function updateCartItemQuantity(userId, product_id, option, newQuanity) {
  if (
    typeof userId !== "undefined" &&
    typeof product_id !== "undefined" &&
    typeof option !== "undefined" &&
    typeof newQuanity !== "undefined"
  ) {
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
      .then((info) => {
        return { ok: true, message: "Quantity Changed Succesfully" };
      })
      .catch((error) => {
        console.log("Error in updateCartItemQuantity function");
        console.log(error);
        return { ok: false, message: "Quantity Change Failed" };
      });
  } else {
    return { ok: false, message: "Not all agruments were supplied." };
  }
}

module.exports = updateCartItemQuantity;
