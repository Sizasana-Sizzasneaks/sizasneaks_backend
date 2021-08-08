const retrieveReviews = require("./functions/RetriveReviews.js");
const prepareReviews = require("./functions/prepareReviews.js");
var { STATUS_CODE } = require("../constants/httpConstants.js");

const getReviews = async function (req, res, next) {
  console.log("get Reviews");

  try {
    if (typeof req.params.product_id !== "undefined") {
      var reviewsResult = await retrieveReviews(req.params.product_id);

      if (reviewsResult.ok === true) {
        // Prepare Review Data
        var prepareReviewsResult = prepareReviews(reviewsResult.data);

        if (prepareReviewsResult.ok === true) {
          //Add Prepared Review Data
          reviewsResult.data = prepareReviewsResult.data;

          res.statusCode = STATUS_CODE.SUCCESS;
          res.send(reviewsResult);
        } else {
          res.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
          res.send(prepareReviewsResult);
        }
      } else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        res.send(reviewsResult);
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        message: "Please provide a Product Id value",
      });
    }
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};
module.exports = getReviews;
