const mongoose = require("mongoose");
const Review = require("../../../models/Review.js");

function retrieveReviewsById(review_id, projection){

    return Review.find({_id: review_id},projection)

    .then((docs) => {
      
        if (docs.length !== 0) {
          return { ok: true, data: docs };
        } else {
          return {
            ok: false,
            data: docs,
            message: "Review does not exist",
          };
        }
      })
      .catch((error) => {
        if (
          error.path === "review_id" &&
          error instanceof mongoose.CastError &&
          error.kind === "ObjectId"
        ) {
          return { ok: false, message: "Invalid Review ID" };
        } else {
          return { ok: false, message: "Error When Getting Reviews" };
        }
      }); 
}
module.exports = retrieveReviewsById;