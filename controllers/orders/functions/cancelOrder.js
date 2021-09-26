const mongoose = require("mongoose");
const updateOrder = require("./updateOrder.js");
const updateOrderItem = require("./updateOrderItem.js");
const retrieveOrders = require("./RetrieveOrders.js");

async function cancelOrder(orderId, cancelDescription) {
  try {
    if (
      req.body.orderId !== "undefined" &&
      req.body.cancelDescription !== "undefined"
    ) {
      var retrieveOrdersResult = await retrieveOrders(
        { _id: orderId },
        { orderItems: 1 }
      );
      if (retrieveOrdersResult.ok) {
        //update order
        var orderToCancel = retrieveOrdersResult.data[0];
        var updateOrderResult = await updateOrder(orderToCancel._id, {
          isCancelled: true,
          cancelDescription: cancelDescription,
        });

        if (updateOrderResult.ok) {
          var updateOrderItemResult = await Promise.all(
            orderToCancel.orderItems.map((item) =>
              updateOrderItem(item._id, { orderItemCancelled: true })
            )
          )
            .then(() => {
              return { ok: true, message: "Order Items Cancelled" };
            })
            .catch(() => {
              return { ok: false, message: "Failed to cancel order items" };
            });
           return updateOrderItemResult;
        } else {
          return updateOrderResult;
        }
      } else {
        return retrieveOrdersResult;
      }
    } else {
      return {
        ok: false,
        message:
          "Error: cancelOrder function has orderId or cancelDescription undefined",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error: cancelOrder function unexpected error",
    };
  }
}

module.exports = cancelOrder;
