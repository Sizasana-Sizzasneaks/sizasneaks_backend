const mongoose = require("mongoose");
const Review = require("../../../models/Review.js");
const review = require("../../reviews/deleteReview.js");

function daleteProductReview(review_id) {
  console.log("Delete reviews here");
  return Review.deleteOne({ _id: review_id }).then((result) => {
    if (deletedCount === 1) {
      console.log(result);
      return {
        ok: true,
        message: "Review deleted",
      };
    } else {
      return {
        ok: true,
        message: "Failed to delete the review",
      };
    }
  });
}
module.exports = daleteProductReview;
