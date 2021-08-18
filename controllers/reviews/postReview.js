const createProductReview = require("./functions/createProductReview.js");
var { STATUS_CODE } = require("../constants/httpConstants.js");

const postReview = async function (req, res) {
  console.log("Create Review Controller");

  try {
    //Checks that all function arguments are not undefined before execution.
    if (typeof req.params.product_id !== "undefined") {
      //Checking if credential is set to customer.
      if (req.body.credential === "customer") {
        //The Creation of a review is completed through the use of a review helper function - "controllers\reviews\functions"
        //This function receives the user's id, the product id and the review body content which consists of a reviewScore and a reviewBody.
        var createNewReviewResult = await createProductReview(
          req.body.userId,
          req.params.product_id,
          req.body
        );
        //First Check if creation of review was successful.
        if (createNewReviewResult.ok === true) {
          res.status = STATUS_CODE.SUCCESS; // Attach Success Status Code to Response
          res.send(createNewReviewResult); //Send back an object that contains the corresponding success object.
        } else {
          res.status = STATUS_CODE.BAD_REQUEST; //Attach Bad Request Status code to response object.
          res.send(createNewReviewResult); //Sending back the corresponding failure object.
        }
      } else {
        //Sending Unauthorized Response when credentials do not match customer type.
        res.status = STATUS_CODE.UNAUTHORIZED; //Attaching Unauthorized Status Code to response object.
        res.send({
          //Sending corresponding object
          ok: false,
          message: "Access Denied: Insufficient Credentials",
        });
      }
    } else {
      //Sending Bad Request Response as Product ID was not supplied.
      res.status = STATUS_CODE.BAD_REQUEST; //Attaching Bad Request Status Code to response object.
      res.send({
        //Sending corresponding response object.
        ok: false,
        message: "Product Id not supplied",
      });
    }
  } catch (error) {
    console.log(error);
    // Sending a response when an unknown error occurs during execution.
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; // Attaching an Internal Server Error Status code to the response object.
    res.send({ ok: false, message: "Unknown Server Error" }); //Sending a corresponding response object.
  }
};
module.exports = postReview;
