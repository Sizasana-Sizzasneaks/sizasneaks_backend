const mongoose = require("mongoose");
const Review = require("../../../models/Review.js");

function retrieveReviewById(review_id, projection) {
  //Checks that all function arguments are not undefined before execution.
  if (typeof review_id !== "undefined" && typeof projection !== "undefined") {
    //Performs the search for the review document via the Mongoose API.
    return Review.find({ _id: review_id }, projection)
      .then((docs) => {
        if (docs.length !== 0) {
          //Upon successful execution we first check if any matching review was found.
          return { ok: true, data: docs[0] }; //Returning when the specific review is found.
        } else {
          return {
            //Returning when no matching review is found.
            ok: false,
            message: "Review does not exist",
          };
        }
      })
      .catch((error) => {
        if (
          //Checking if the error thrown is due to an invalid value specified on the review "_id" variable.
          error.path === "_id" &&
          error instanceof mongoose.CastError &&
          error.kind === "ObjectId"
        ) {
          return { ok: false, message: "Invalid Review ID" }; ///Returning when the supplied search object contains an invalid review id value (invalid format).
        } else {
          return { ok: false, message: "Error When Getting Reviews" }; //Returning when unknown error is thrown when searching for the review.
        }
      });
  } else {
    return { ok: false, message: "Unknown Error When Getting Reviews" }; //Returning when unknown error is thrown during function execution.
  }
}
module.exports = retrieveReviewById;
