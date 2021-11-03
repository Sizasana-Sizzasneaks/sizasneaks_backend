const OrderItem = require("../../../models/OrderItem.js");

function retrieveOrderItem(search, projection) {
  try {
    if (typeof search !== "undefined" && typeof projection !== "undefined") {
      return OrderItem.find(search, projection)
        .lean()
        .then((docs) => {
          if (docs.length !== 0) {
            return { ok: true, data: docs }; //Returning when there are reviews that match search criteria.
          } else {
            return {
              //Returning when there is no matching order found.
              ok: false,
              data: docs,
              message: "No order items found",
            };
          }
        })
        .catch((error) => {
          console.log(error);
          return { ok: false, message: "Error when getting orderItems" }; //Returning a general error when an unknown error is thrown when searching for reviews.
        });
    } else {
      return {
        ok: false,
        message:
          "Search and projection objects must be supplied to retrieve orders",
      };
    }
  } catch (error) {
    console.log("Error: In Retrieving OrderItems");
    console.log(error);
    return { ok: false, message: "Unexpected error when retrieving orders." };
  }
}

module.exports = retrieveOrderItem;
