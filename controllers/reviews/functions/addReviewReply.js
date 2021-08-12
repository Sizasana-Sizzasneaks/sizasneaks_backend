const mongoose = require("mongoose");
const Review = require("../../../models/Review.js");

function addReviewReply(reviewId, reviewReply) {
  if (typeof reviewId !== "undefined" && typeof reviewReply !== "undefined") {
    return Review.updateOne(
      { _id: reviewId },
      {
        $push: { replies: { body: reviewReply } },
      }
    )
      .then(() => {
        console.log("Update Worked");
        return { ok: true };
      })
      .catch((error) => {
        console.log("Update Failed");
        if (
          error.path === "_id" &&
          error instanceof mongoose.CastError &&
          error.kind === "ObjectId"
        ) {
          return { ok: false, message: "Invalid Review ID" };
        } else {
          return { ok: false, message: "Error Add Reply to Review" };
        }
      });
  } else {
    return { ok: false, error: "Review ID and/or Reply not supplied." };
  }
}

module.exports = addReviewReply;
