const retrieveReviewById = require("./functions/RetrieveReviewById.js");
const retrieveUserDetails = require("../user/functions/retrieveUserDetails.js");
const retrieveProducts = require("../products/functions/retrieveProducts.js");
const addReviewReply = require("./functions/addReviewReply.js");

const { reviewReplyEmail } = require("../../services/emailing/emailing.js");

async function postReviewReply(req, res, next) {
  try {
    if (
      typeof req.params.review_id !== "undefined" &&
      typeof req.body.reviewReply !== "undefined"
    ) {
      //This variable will hold all the data to be sent via email.
      var emailContent = {};
      if (req.body.credential === "unknown") {
        //Add Reply to Review
        var addReviewReplyResult = await addReviewReply(
          req.params.review_id,
          req.body.reviewReply
        );

        //Check add Reply to Review Success
        if (addReviewReplyResult.ok === true) {
          //Get Updated Review
          var getReviewResult = await retrieveReviewById(
            req.params.review_id,
            {}
          );

          //Check Get Updated Review Success
          if (getReviewResult.ok === true) {
            //Add Review Content to Email Data
            emailContent["review"] = getReviewResult.data;

            var getUserEmailResult = await retrieveUserDetails(
              getReviewResult.data.customer_id,
              { email: 1 }
            );

            if (getUserEmailResult.ok === true) {
              //Add the Reviever Email to Email Content
              emailContent["email"] = getUserEmailResult.data.email;

              var getProductResult = await retrieveProducts(
                { _id: getReviewResult.data.product_id },
                { brand: 1, productName: 1, imgURls: 1, _id: 0 }
              );

              if (getProductResult.ok === true) {
                // Add the Product info to the email contnet
                emailContent["product"] = getProductResult.data[0];

                //Send Email
                var sendReviewReply = await reviewReplyEmail(emailContent);

                if (sendReviewReply.ok === true) {
                  res.status = STATUS_CODE.SUCCESS;
                  res.send(sendReviewReply);
                  
                } else {
                  res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                  res.send(sendReviewReply);
                }

                
              } else {
                res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                res.send(getProductResult);
              }
            } else {
              res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
              res.send(getUserEmailResult);
            }
          } else {
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(getReviewResult);
          }
        } else {
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send(addReviewReplyResult);
        }

        //var getReviewResult = await  retrieveReviewById(req.params.review_id, {});
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
        error: "Review id and/or Review Reply Not supplied",
      });
    }
  } catch (error) {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
    console.log(error);
  }
}

module.exports = postReviewReply;
