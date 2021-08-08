const deleteReviewById = require("./functions/deleteReviewById");

var { STATUS_CODE } = require("../constants/httpConstants.js");
const retrieveReviewsById = require("./functions/RetrieveReviewById.js");

const deleteReview = async function (req, res, next) {
  console.log("delete Reviews");

  try {
    if (typeof req.params.review_id !== "undefined") {
      if (
        req.body.credential === "customer" ||
        req.body.credential === "administrator"
      ) {
        if (req.body.credential === "customer") {
          var retrieveReviewbyIdResult = await retrieveReviewsById(
            req.params.review_id,
            { customer_id: 1, _id: 0 }
          );

          if (retrieveReviewbyIdResult.ok === true) {
            if (retrieveReviewbyIdResult.data.customer_id !== req.body.userId) {
              res.status = STATUS_CODE.UNAUTHORIZED;
              res.send({
                ok: false,
                message: " You are not authorized to delete this review",
              });
              return;
            }
          } else {
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send({
              ok: false,
              message: "Unable to Verify delete authority",
            });
          }
        }

        var reviewsResult = await deleteReviewById(req.params.review_id);
        if (reviewsResult.ok === true) {
          res.statusCode = STATUS_CODE.SUCCESS;
          res.send(reviewsResult);
        } else {
          res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
          res.send(reviewsResult);
        }
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          message: " You are not authorized to delete this review",
        });
        return;
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: flase,
        message: "insufficient credentails",
      });
    }
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};
module.exports = deleteReview;
