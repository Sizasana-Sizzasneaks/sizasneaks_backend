const approveSingleReview = require("./functions/approveSingleReview.js");

var { STATUS_CODE } = require("../constants/httpConstants.js");

const approveReview = async function (req, res, next) {
  console.log("Approve Reviews");
  try {
    //Checks that all function arguments are not undefined before execution.
    if (typeof req.params.review_id !== "undefined") {
      if (
        //Checks if the credential type supplied matches either a customer or administrator.
        req.body.credential === "administrator"
      ) {
        //Performing the approval of a product review by passing the review id supplied to he necessary review helper function.
        var reviewsResult = await approveSingleReview(req.params.review_id);
        if (reviewsResult.ok === true) {
          // Checking if approving review was successful.
          res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
          res.send(reviewsResult); //Sending back a success object, containing a success message.
          next();
        } else {
          res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
          res.send(reviewsResult); // Sending back an error object with the corresponding error message, specifying more details about the error.
        }
      } else {
        //Sending back an unauthorized message when the credential type specified in the request object is not of type customer or administrator.
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
          ok: false,
          message: "You are not authorized to approve this review",
        });
        return; //Ending function execution here
      }
    } else {
      //Returning when The review Id is not supplied
      res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
      res.send({
        //Sends error object when the review id is not supplied.
        ok: false,
        message: "Review Id Not Supplied",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, message: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the reason for execution failure.
  }
};
module.exports = approveReview;
