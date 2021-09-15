const mongoose = require("mongoose");
const Review = require("../../../models/Review.js");
const retrieveUserDetails = require("../../user/functions/retrieveUserDetails");

async function createProductReview(userId, productId, reviewData) {
  //Checks that all function arguments are not undefined before execution.
  if (
    typeof productId !== "undefined" &&
    typeof userId !== "undefined" &&
    typeof reviewData.body !== "undefined" &&
    typeof reviewData.rating !== "undefined"
  ) {
    //Getting the details of the user that has invoked the creation of the review.
    var retrieveUserDetailsResult = await retrieveUserDetails(userId, {
      firstName: 1,
      lastName: 1,
      isAnonymous: 1,
      _id: 0,
    });

    if (retrieveUserDetailsResult.ok === true) {
      //Checking if retrieval of user details executed successfully.
      if (retrieveUserDetailsResult.data.isAnonymous === false) {
        //Making sure that the user that invoked the creation of this review is not an anonymous user.
        //Creating a review object based on the Review schema detailed for this system. - models\Review.js
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

        //Saving the review object that has just be created.
        return review
          .save()
          .then(() => {
            //Returns a successful object and message when the review has been saved as a document in the collection.
            return { ok: true, message: "Review Created" };
          })
          .catch(() => {
            //Returns unsuccessful object and message when saving of a new product review fails.
            return { ok: false, message: "Failed to create new review" };
          });
      } else {
        //Returns an unsuccessful object and message when review creation is invoked by an Anonymous customer.
        return { ok: false, message: "Guest users cannot review products" };
      }
    }
    else {//Returns unsuccessful object and message when the execution of this function fails to retrieve details on the user that has invoked the creation of this review.
      return { ok: false, message: "Failed to retrieve customer details" };
    }
  } else {
    return { ok: false, message: "Insufficient data supplied" }; //Returns unsuccessful object and message when any function argument is not defined.
  }
}

module.exports = createProductReview;
 