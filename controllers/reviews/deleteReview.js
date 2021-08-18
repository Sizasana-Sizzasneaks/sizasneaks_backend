const deleteReviewById = require("./functions/deleteReviewById");

var { STATUS_CODE } = require("../constants/httpConstants.js");
const retrieveReviewsById = require("./functions/RetrieveReviewById.js");

const deleteReview = async function (req, res, next) {
  console.log("Delete Reviews");

  try {
    //Checks that all function arguments are not undefined before execution.
    if (typeof req.params.review_id !== "undefined") {
      if (
        //Checks if the credential type supplied matches either a customer or administrator.
        req.body.credential === "customer" ||
        req.body.credential === "administrator"
      ) {
        if (req.body.credential === "customer") {
          //Checks if the credential type is of type customer.
          // Retrieving the customer id of the review in order to check if the customer invoking the deletion of this review created this review.
          var retrieveReviewByIdResult = await retrieveReviewsById(
            req.params.review_id,
            { customer_id: 1, _id: 0 }
          );

          if (retrieveReviewByIdResult.ok === true) {
            //Checking if retrieving of review details executed successfully.
            if (retrieveReviewByIdResult.data.customer_id !== req.body.userId) {
              //Checks if review customer id matches user id supplied by request object.
              res.status = STATUS_CODE.UNAUTHORIZED;
              res.send({
                //Returning when the review customer_id anf userId specified in the request object do not match.
                ok: false,
                message: " You are not authorized to delete this review",
              });
              return; //Ending function execution here.
            }
          } else {
            // Returning When the system is unable to determine if the client that has invoked this deletion of a review, is the client that wrote the review.
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send({
              ok: false,
              message: "Unable to verify delete authority",
            });
            return; //Ending function execution here.
          }
        }

        //Performing the deletion of a product review by passing the review id supplied to he necessary review helper function.
        var reviewsResult = await deleteReviewById(req.params.review_id);
        if (reviewsResult.ok === true) { // Checking if review deletion was successful.
          res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
          res.send(reviewsResult); //Sending back a success object, containing a success message.
        } else {
          res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
          res.send(reviewsResult); // Sending back an error object with the corresponding error message, specifying more details about the error.
        }
      } else { 
        //Sending back an unauthorized message when the credential type specified in the request object is not of type customer or administrator.
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({ //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
          ok: false,
          message: "You are not authorized to delete this review",
        });
        return; //Ending function execution here
      }
    } else {
      //Returning when The review Id is not supplied
      res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
      res.send({//Sends error object when the review id is not supplied.
        ok: false,
        message: "Review Id Not Supplied",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, error: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the reason for execution failure.
  }
};
module.exports = deleteReview;
