const mongoose = require("mongoose");
const Order = require("../../../models/Order.js");

async function updateOrder(orderId, orderData) {
  try {
    //Checks that all function arguments are not undefined before execution.
    if (typeof orderId !== "undefined" && typeof orderData !== "undefined") {
      return Order.updateOne({
          _id: orderId
        }, orderData) //Performs the update using the Mongoose API
        .then(() => {
          return {
            ok: true,
            message: "Fields Updated."
          }; //Returning when the update of an order is successful.
        }).catch((error) => {
          if (
            //Checking if the error thrown is due to an invalid value specified on the "_id" variable.
            error.path === "_id" &&
            error instanceof mongoose.CastError &&
            error.kind === "ObjectId"
          ) {
            return {
              ok: false,
              message: "Invalid Order ID"
            }; //Returning when the supplied search object contains an invalid order id value (invalid format).
          } else {
            return {
              //Return a general error when the retrieving of order is unsuccessful.
              ok: false,
              message: "Error When updating Order",
              error: error,
            };
          }
        });
    } else {
      return {
        //Returns unsuccessful object and message when orderId and/or orderData arguments are not defined.
        ok: false,
        message: "Update Order Requires both a order id and order data",
      };
    }
  } catch {
    return {
      ok: false,
      message: "Unknown Error when Updating Order"
    }; // Returning when Unknown error is thrown while executing this functions code.
  }

}

module.exports = updateOrder;
