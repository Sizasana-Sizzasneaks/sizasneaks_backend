const mongoose = require("mongoose");
const Review = require("../../../models/Review.js");
const retrieveUserDetails = require("../../user/functions/retrieveUserDetails");


async function createProductReview(userId, productId, reviewData) {
  console.log("create reviews here");
  if (
    typeof productId !== "undefined" &&
    typeof userId !== "undefined" &&
    typeof reviewData.body !== "undefined" &&
    typeof reviewData.rating !== "undefined"
  ) {
    
    var retrieveUserDetailsResult = await retrieveUserDetails(userId, {
      firstName: 1,
      lastName: 1,
      isAnonymous: 1,
      _id: 0,
    });

    if (retrieveUserDetailsResult.ok === true) {
      console.log(retrieveUserDetailsResult);
      if (retrieveUserDetailsResult.data.isAnonymous === false) {
        var review = new Review({
          customer_id: userId,
          customerFullName:
            retrieveUserDetailsResult.data.firstName +
            " " +
            retrieveUserDetailsResult.data.lastName,
          product_id: productId,
          rating: reviewData.rating,
          body: reviewData.body,
        });

        return review
          .save()
          .then(() => {
            return { ok: true, message: "Review created" };
          })
          .catch((error) => {
            console.log(error);
            return { ok: false, message: "Failed To Create New Review" };
          });
      } else {
        return{ok: false, message: "Guest users cannot review products"};
      }
    } else {
      return { ok: false, message: "Failed to Retrieve Customer details" };
    }
  } else {
    return { ok: false, message: "Insufficient data supplied" };
  }
}

module.exports = createProductReview;
