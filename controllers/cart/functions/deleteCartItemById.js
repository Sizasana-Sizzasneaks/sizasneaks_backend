const mongoose = require("mongoose");
const Customer = require("../../../models/customer.js");


function daleteCartItem(productId) {
  console.log("Delete Cart Item Function");
  return Customer.deleteOne({ $pull:{cart: {productId:productId} }}).then((result) => {
    if (result.deletedCount === 1) {
      console.log(result);
      return {
        ok: true,
        message: "Item  Deleted",
      };
    } else {
      return {
        ok: true,
        message: "Failed to delete the item from cart",
      };
    }
  });
}
module.exports = daleteCartItem;

