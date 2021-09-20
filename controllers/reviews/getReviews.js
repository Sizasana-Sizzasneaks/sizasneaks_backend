const retrieveReviews = require("./functions/RetriveReviews.js");
const prepareReviews = require("./functions/prepareReviews.js");
var { STATUS_CODE } = require("../constants/httpConstants.js");

const getReviews = async function (req, res, next) {
  console.log("Get Reviews");
  try {
    //Checks that all function arguments are not undefined before execution.
    if (typeof req.params.product_id !== "undefined") {
      //Set General Review fields Projection
      var projection = {
        customerFullName: 1,
        customer_id: 1,
        rating: 1,
        body: 1,
        createdAt: 1,
      };

      //Checking if credential is set to administrator.
      if (req.body.credential === "administrator") {
        //Adding Review Replies to projection if requesting client has a credential type of administrator.
        projection = { ...projection, replies: 1 };
      }
      //Performing retrieval of customer reviews through the use of a review helper function - Supplying the function with the corresponding product id and fields projection.
      var reviewsResult = await retrieveReviews(
        req.params.product_id,
        projection
      );

      //Checking if retrieval of product reviews executed successfully.
      if (reviewsResult.ok === true) {
        // Preparing product reviews that have been found (Calculating summaries and average of reviews found)
        var prepareReviewsResult = prepareReviews(reviewsResult.data);

        if (prepareReviewsResult.ok === true) {
          //Adding prepared product review to an output object
          reviewsResult.data = prepareReviewsResult.data;

          res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
          res.send(reviewsResult); //Sending back a success object
        } else {
          res.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
          res.send(prepareReviewsResult); //Sending object containing result message (error).
        }
      } else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
        res.send(reviewsResult); //Sending object containing result message (error).
      }
    } else {
      //Sending response when necessary arguments are not defined
      res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
      res.send({
        ok: false,
        message: "Product_id is undefined",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, message: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};
module.exports = getReviews;
