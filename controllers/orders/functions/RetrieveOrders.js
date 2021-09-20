const mongoose = require("mongoose");
const Order = require("../../../models/Order.js");

function retrieveOrders(search, projection) {
  try {
    if (typeof search !== "undefined" && typeof projection !== "undefined") {
      //Performs the search using the Mongoose API.
      return Order.find(search, projection)
        .populate("orderItems")
        .sort({ createdAt: "descending" }) //Sorting the Orders to be returned by their timestamp (descending order).
        .lean()
        .then((docs) => {
          //Checking if no orders where found.
          if (docs.length !== 0) {
            return { ok: true, data: docs }; //Returning when there are reviews that match search criteria.
          } else {
            return {
              //Returning when there is no matching order found.
              ok: false,
              data: docs,
              message: "No Orders Found",
            };
          }
        })
        .catch((error) => {
          console.log(error);
          return { ok: false, message: "Error when getting orders" }; //Returning a general error when an unknown error is thrown when searching for reviews.
        });
    } else {
      return {
        ok: false,
        message:
          "Search and projection objects must be supplied to retrieve orders",
      };
    }
  } catch (error) {
    console.log("Error: In Retrieving Orders");
    console.log(error);
    return { ok: false, message: "Unexpected error when retrieving orders." };
  }
}

module.exports = retrieveOrders;
