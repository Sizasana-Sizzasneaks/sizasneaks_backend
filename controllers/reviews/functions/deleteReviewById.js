const Review = require("../../../models/Review.js");

function deleteProductReview(review_id) {
  //Checks that all function arguments are not undefined before execution.
  if (typeof review_id !== "undefined") {
    //Performs the delete using the Mongoose API.
    return Review.deleteOne({ _id: review_id })
      .then((result) => {
        if (result.deletedCount === 1) {
          //When execution successfully completes we check that the count of items delete equals to one.
          return {
            //Returning when the review has been successfully been deleted.
            ok: true,
            message: "Review Deleted",
          };
        } else {
          return {
            //Returning when a single review has not been deleted.
            ok: true,
            message: "Failed to delete the review",
          };
        }
      })
      .catch(() => {
        return {
          //Returning when an error occurs when attempting to delete a review.
          ok: true,
          message: "Failed to delete the review",
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
module.exports = deleteProductReview;
