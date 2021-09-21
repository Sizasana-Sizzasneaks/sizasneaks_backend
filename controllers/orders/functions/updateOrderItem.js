const mongoose = require("mongoose");
const OrderItem = require("../../../models/OrderItem.js");

async function updateOrderItem(orderItemId, orderItemData) {
  try {
    //Checks that all function arguments are not undefined before execution.
    if (typeof orderId !== "undefined" && typeof orderData !== "undefined") {
      return OrderItem.updateOne({
          _id: orderItemId
        }, orderItemData) //Performs the update using the Mongoose API
        .then(() => {
          return {
            ok: true,
            message: "Fields Updated."
          }; //Returning when the update of an order item is successful.
        }).catch((error) => {
          if (
            //Checking if the error thrown is due to an invalid value specified on the "_id" variable.
            error.path === "_id" &&
            error instanceof mongoose.CastError &&
            error.kind === "ObjectId"
          ) {
            return {
              ok: false,
              message: "Invalid Order Item ID"
            }; //Returning when the supplied search object contains an invalid order item id value (invalid format).
          } else {
            return {
              //Return a general error when the retrieving of order item is unsuccessful.
              ok: false,
              message: "Error When updating Order Item",
              error: error,
            };
          }
        });
    } else {
      return {
        //Returns unsuccessful object and message when orderId and/or orderData arguments are not defined.
        ok: false,
        message: "Update Order Requires both a order item id and order item data",
      };
    }
  } catch {
    return {
      ok: false,
      message: "Unknown Error when Updating Order Item"
    }; // Returning when Unknown error is thrown while executing this functions code.
  }

}

module.exports = updateOrderItem;
