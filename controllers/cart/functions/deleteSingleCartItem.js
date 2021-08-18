const Customer = require("../../../models/Customer.js");

function deleteSingleCartItem(userId, product_id, option) {
  // check arguments are not undefined
  if (
    typeof userId !== "undefined" &&
    typeof product_id !== "undefined" &&
    typeof option !== "undefined"
  ) {
    // use Moongose API 
    // deleting an item within an array within an collection is a update 
    // $pull refers to as removing a specific instance
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
      .then(() => {
        return { ok: true, message: "Cart Item Deleted Successfully" };
      })
      .catch(() => {
        return { ok: false, message: "Failed to Delete Cart Item" };
      });
  } else {
    return { ok: false, message: "Not all arguments were supplied." };
  }
}

module.exports = deleteSingleCartItem;
