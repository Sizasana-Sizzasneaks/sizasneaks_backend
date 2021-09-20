const retrieveReviewById = require("./functions/RetrieveReviewById.js");
const retrieveUserDetails = require("../user/functions/retrieveUserDetails.js");
const retrieveProducts = require("../products/functions/retrieveProducts.js");
const addReviewReply = require("./functions/addReviewReply.js");
const { reviewReplyEmail } = require("../../services/emailing/emailing.js");

async function postReviewReply(req, res, next) {
  try {
    //Checks that all function arguments are not undefined before execution.
    if (
      typeof req.params.review_id !== "undefined" &&
      typeof req.body.reviewReply !== "undefined"
    ) {
      //This variable will hold all the data to be sent via email to user that wrote the corresponding review.
      var emailContent = {};
      if (req.body.credential === "administrator") {
        //Add Reply to Review
        //This is completed using a review helper function that receives the review id and the reviewReply message.
        var addReviewReplyResult = await addReviewReply(
          req.params.review_id,
          req.body.reviewReply
        );

        //Check add Reply to Review Success
        if (addReviewReplyResult.ok === true) {
          // Checking if the Reply was successfully added to the reply document on the database

          //Following the adding of the reply.
          //The updated review document is retrieved from the database using another review helper function.
          //This is done in order to get the details on the review. In order to begin preparing the data to be sent in the corresponding email.
          var getReviewResult = await retrieveReviewById(
            req.params.review_id, //Specifying the review id.
            {} // Specifying a an empty projection object, in order to return all details about the review.
          );

          //First Check that retrieval of the updated Review was successful.
          if (getReviewResult.ok === true) {
            //Adding Review Content to the email content variable.
            emailContent["review"] = getReviewResult.data;

            //The customer id associated with the review is used to retrieve the customers email address.
            var getUserEmailResult = await retrieveUserDetails(
              getReviewResult.data.customer_id,
              { email: 1 } //Specifying projection that will only return a corresponding email address.
            );
            //Checking if retrieval of the customers email address was successful.
            if (getUserEmailResult.ok === true) {
              //Add the customers email address to Email Content variable.
              emailContent["email"] = getUserEmailResult.data.email;

              //Now specific product details about the corresponding product are being sourced.
              //This uses a product helper function that sources a specific products details based on its product id.
              var getProductResult = await retrieveProducts(
                { _id: getReviewResult.data.product_id },
                { brand: 1, productName: 1, imgURls: 1, _id: 0 } //Specifying the needed projection.
              );

              //Checking if retrieval of product details executed successfully.
              if (getProductResult.ok === true) {
                //Adding the Product details to the email content object.
                emailContent["product"] = getProductResult.data[0];

                //Finally, the email is sent
                //This email is sent using one of the email service functions. Details on this can be found at "services\emailing".
                var sendReviewReply = await reviewReplyEmail(emailContent);

                //checking that sending of the email was executed successfully.
                if (sendReviewReply.ok === true) {
                  //Sending back a successful response.
                  res.status = STATUS_CODE.SUCCESS;
                  res.send(sendReviewReply);
                } else {
                  //Sending a failure response indicating that sending of the corresponding email was not successful.
                  res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                  res.send(sendReviewReply);
                }
              } else {
                //Sending error indicating that retrieval of the corresponding products details was unsuccessful.
                res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                res.send(getProductResult);
              }
            } else {
              //Sending error indicating that retrieval of the corresponding customer's email was unsuccessful.
              res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
              res.send(getUserEmailResult);
            }
          } else {
            //Sending error indicating that retrieval of the updated review object was unsuccessful.
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(getReviewResult);
          }
        } else {
          //Sending a response indicating that the adding or replies to the review object was not successful.
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send(addReviewReplyResult);
        }
      } else {
        //Sending a response when the credential of the client that invoked the execution of this function is not of type administrator.
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          message: "Access Denied: Insufficient Credentials",
        });
      }
    } else {
      //Sending a response when the require arguments are not supplied.
      res.status = STATUS_CODE.BAD_REQUEST;
      res.send({
        ok: false,
        message: "Review id and/or Review Reply Not supplied",
      });
    }
  } catch (error) {
    console.log(error);
    //Sending a message when an unexpected unknown error is thrown.
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, message: "Unknown Server Error" });
  }
}

module.exports = postReviewReply;
