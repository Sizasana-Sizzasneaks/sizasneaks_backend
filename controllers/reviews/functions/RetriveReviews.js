const mongoose = require("mongoose");
const Review = require("../../../models/Review.js");

function retrieveReviews(search, projection) {
  //Checks that all function arguments are not undefined before execution.
  if (typeof search !== "undefined" && typeof projection !== "undefined") {
    //Performs the search using the Mongoose API.
    return Review.find(search, projection)
      .sort({ createdAt: "descending" }) //Sorting the reviews to be returned by their timestamp (descending order).
      .then((docs) => {
        if (docs.length !== 0) {
          //Checking if no reviews match the product id supplied.
          return { ok: true, data: docs }; //Returning when there are reviews that match search criteria.
        } else {
          return {
            //Returning when there is no matching review found.
            ok: false,
            data: docs,
            message: "No reviews for this product",
          };
        }
      })
      .catch((error) => {
        if (
          //Checking if the error thrown is due to an invalid value specified on the product "_id" variable.
          error.path === "product_id" &&
          error instanceof mongoose.CastError &&
          error.kind === "ObjectId"
        ) {
          return { ok: false, message: "Invalid Product ID" }; //Returning when the error thrown is due to an invalid product id supplied to the Mongoose API.
        } else {
          return { ok: false, message: "Error When Getting Reviews" }; //Returning a general error when an unknown error is thrown when searching for reviews.
        }
      });
  } else {
    //Returns unsuccessful object and message when Product_id and/or projection arguments are not defined.
    return {
      ok: false,
      message:
        "RetrieveReviews: Search object and/or projection arguments are undefined.",
    };
  }
}
module.exports = retrieveReviews;
