const deleteReviewById = require("./functions/deleteReviewById");

var { STATUS_CODE } = require("../constants/httpConstants.js");
const retrieveReviewsById = require("./functions/RetriveReviewById");

const deleteReview = async function (req, res, next) {
  console.log("delete Reviews");
  if (typeof req.params.review_id !== "undefined") {
    if (req.body.credential === "customer") {
        var retrieveReviewbyIdResult = await retrieveReviewsById(req.params.review_id);
        if (retrieveReviewbyIdResult.ok === true)
        {
            res.statusCode = STATUS_CODE.SUCCESS;
            res.send(retrieveReviewbyIdResult);
        }else {
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(retrieveReviewbyIdResult);
          }
      var reviewsResult = await deleteReviewById(req.params.review_id);
      if (reviewsResult.ok === true) {
        res.statusCode = STATUS_CODE.SUCCESS;
        res.send(reviewsResult);
      } else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        res.send(reviewsResult);
      }
    } else if (req.body.credential === "administrator") {
      var reviewsResult = await deleteReviewById(req.params.review_id);
      if (reviewsResult.ok === true) {
        res.statusCode = STATUS_CODE.SUCCESS;
        res.send(reviewsResult);
      } else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        res.send(reviewsResult);
      }
    }
  } else {
    res.status = STATUS_CODE.UNAUTHORIZED;
    res.send({
      ok: flase,
      message: "insufficient credentails",
    });
  }
};
module.exports = deleteReview;
