const OrderItem = require("../../../models/OrderItem.js");

async function deleteOrderItem(orderItemId) {
  try {
    if (typeof orderItemId !== "undefined") {
      return OrderItem.deleteOne({ _id: orderItemId })
        .then(() => {
          return { ok: true, message: "OrderItem deleted successfully." };
        })
        .catch((error) => {
          return { ok: false, message: "Failed to deleted OrderItem." };
        });
    }
  } catch {
    return { ok: false, message: "Unexpected error when deleting order item." };
  }
}

module.exports = deleteOrderItem;
