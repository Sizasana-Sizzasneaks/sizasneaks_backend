const retrieveReviews = require("../functions/RetriveReviews.js");
const calculateAverageRatingScore = require("./calculateAverageRatingScore.js");
const updateProduct = require("../../products/functions/updateProduct.js");

const updateProductAverageRatingScore = async (req, res, next) => {
  try {
    console.log(req.body);
    if (typeof req.body.product_id !== "undefined") {
      console.log("Happened");
      var projection = {
        rating: 1,
        approved: 1,
      };
      //Get all Reviews By Product
      var reviewsResult = await retrieveReviews(
        { product_id: req.body.product_id, approved: true },
        projection
      );

      if (reviewsResult.ok === true) {
        //Calculate Average Rating Score
        var getAverageScoreResult = calculateAverageRatingScore(
          reviewsResult.data
        );

        if (getAverageScoreResult.ok === true) {
          //Update Product Average Rating Score
          var updateProductResult = await updateProduct(req.body.product_id, {
            averageRatingScore: getAverageScoreResult.data,
          });
          console.log(getAverageScoreResult.data);
          // Check if an error took place when updating the products average review score
          if (!updateProductResult.ok) {
            console.log("Failed to Update Average Rating Score");
            console.log(updateProductResult);
          }
        } else {
          console.log("Failed Calculating Average Review Score");
          console.log(getAverageScoreResult);
        }
      } else {
        console.log("Failed Getting Reviews");
        console.log(reviewsResult);
      }
    }
  } catch (error) {
    console.log("Error Updating Product Average Rating");
    console.log(error);
  }
};
module.exports = updateProductAverageRatingScore;
