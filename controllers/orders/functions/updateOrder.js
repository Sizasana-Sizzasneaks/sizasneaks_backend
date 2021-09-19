const mongoose = require("mongoose");
const Order = require("../../../models/Order.js");

async function updateOrderStatus(orderId, statusData){
    try{
        if (
            typeof orderId !== "undefined") {
                return Order.updateOne({_id: orderId}, statusData).then(() =>{
                    return { ok: true, message: "fields Updated." };
                }).catch((error) => {
                    if (
                        //Checking if the error thrown is due to an invalid value specified on the "_id" variable.
                        error.path === "_id" &&
                        error instanceof mongoose.CastError &&
                        error.kind === "ObjectId"
                      ) {
                        return { ok: false, message: "Invalid Order ID" }; //Returning when the supplied search object contains an invalid order id value (invalid format).
                      } else {
                        return {
                          //Return a general error when the retrieving of order is unsuccessful.
                          ok: false,
                          message: "Error When updating Order Status",
                          error: error,
                        };
                      }
                });
        } else {
            return {
              //Returns unsuccessful object and message when productId and/or productData arguments are not defined.
              ok: false,
              message: "Update Product Requires both a order id and new status",
            };
          }
    }catch {
      return { ok: false, message: "Unknown Error when Updating Order Status" }; // Returning when Unknown error is thrown while executing this functions code.
    }
    
}

module.exports = updateOrderStatus;

