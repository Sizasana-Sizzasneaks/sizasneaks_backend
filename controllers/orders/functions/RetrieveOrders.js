const mongoose = require("mongoose");
const Order = require("../../../models/Order.js");

function retrieveOrders(){
    //Performs the search using the Mongoose API.
    return Order.find()
      .sort({ createdAt: "descending" }) //Sorting the reviews to be returned by their timestamp (descending order).
      .then((docs) => {
        console.log("Get Order controller");
        return { ok: true, data: docs };
        /* if (docs.length !== 0) {
          //Checking if no orders match the product id supplied.
          return { ok: true, data: docs }; //Returning when there are reviews that match search criteria.
        } else {
          return {
            //Returning when there is no matching order found.
            ok: false,
            data: docs,
            message: "No reviews for this product",
          };
        } */
      })
      .catch(() => {
         
           
        return { ok: false, message: "Error When Getting Orders" }; //Returning a general error when an unknown error is thrown when searching for reviews.
        
      });
}

module.exports = retrieveOrders;