const Review = require("../../../models/Review.js");

function approveSingleReview(review_id) {
  //Checks that all function arguments are not undefined before execution.
  if (typeof review_id !== "undefined") {
    //Performs the delete using the Mongoose API.
    return Review.updateOne({ _id: review_id }, { approved: true })
      .then(() => {
        return {
          //Returning when a single review has not been deleted.
          ok: true,
          message: "Review approved successfully ",
        };
      })
      .catch(() => {
        return {
          //Returning when an error occurs when attempting to delete a review.
          ok: true,
          message: "Failed to approve review",
        };
      });
  } else {
    return {
      //Returning when not all required arguments are defined.
      ok: true,
      message: "Review ID not Specified.",
    };
  }
}
module.exports = approveSingleReview;
