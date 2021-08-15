const Customer = require("../../../models/Customer.js");

//This function Performs the act of deleting a single cart item within
//a user's shopping cart.
function deleteSingleCartItem(userId, product_id, option) {
  if (
    typeof userId !== "undefined" &&
    typeof product_id !== "undefined" &&
    typeof option !== "undefined"
  ) {
    return Customer.updateOne(
      {
        userId: userId,
      },
      {
        $pull: {
          cart: {
            product_id: product_id,
            option: { color: option.color, size: option.size },
          },
        },
      }
    )
      .then((info) => {
        console.log(info);
        return { ok: true, message: "Cart Item Deleted Succesfully" };
      })
      .catch((error) => {
        console.log("Error in deleteSingleCartItem function");
        console.log(error);
        return { ok: false, message: "Failed to Delete Cart Item" };
      });
  } else {
    return { ok: false, message: "Not all agruments were supplied." };
  }
}

module.exports = deleteSingleCartItem;
