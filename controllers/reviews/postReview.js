const createProductReview = require("./functions/createProductReview.js");

const postReview = async function (req, res) {
  console.log("Create Review Controller");

  try {
    if (typeof req.params.product_id !== "undefined") {
      if (req.body.credential === "customer") {
        console.log(req.body);
        var createNewReviewResult = await createProductReview(
          req.body.userId,
          req.params.product_id,
          req.body
        );

        console.log(createNewReviewResult);
        if (createNewReviewResult.ok === true) {
          res.status = STATUS_CODE.SUCCESS;
          res.send(createNewReviewResult);
        } else {
          res.status = STATUS_CODE.UNAUTHORIZED;
          res.send(createNewReviewResult);
        }
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          error: "Insufficient Credentials",
        });
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        error: "Product Id not supplied",
      });
    }
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};
module.exports = postReview;
