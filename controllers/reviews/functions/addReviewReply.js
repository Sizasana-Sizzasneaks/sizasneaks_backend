const mongoose = require("mongoose");
const Review = require("../../../models/Review.js");

function addReviewReply(reviewId, reviewReply) {
  //Checks that all function arguments are not undefined before execution.
  if (typeof reviewId !== "undefined" && typeof reviewReply !== "undefined") {
    //Performs the update using the Mongoose API
    return Review.updateOne(
      { _id: reviewId }, //Searching for the review to add the reply to, search is being done by review id.
      {
        $push: { replies: { body: reviewReply } }, //The reply is being added to the replies array attached to the specific review document in the collection of reviews.
      }
    )
      .then(() => {
        return { ok: true }; //Returning when the review reply has been added successfully.
      })
      .catch((error) => {
        if (
          //Checking if the error thrown is due to an invalid value specified on the review "_id" variable.
          error.path === "_id" &&
          error instanceof mongoose.CastError &&
          error.kind === "ObjectId"
        ) {
          return { ok: false, message: "Invalid Review ID" }; //Returning when the supplied search object contains an invalid review id value (invalid format).
        } else {
          return { ok: false, message: "Error Adding Reply to Review" }; //Return a general error when the adding of a review reply is unsuccessful.
        }
      });
  } else {
    //Returns unsuccessful object and message when reviewId and/or reviewReply arguments are not defined.
    return { ok: false, error: "Review ID and/or Reply not supplied." };
  }
}

module.exports = addReviewReply;
