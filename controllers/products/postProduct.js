const createProduct = require("./functions/createProduct.js");
var { STATUS_CODE } = require("../constants/httpConstants.js");
const postProduct = async function (req, res, next) {
  console.log("Create Product");

  try {
    if (req.body.credential === "administrator") {
      //Checks that the credential type is set to administrator.
      var createProductResult = await createProduct(req.body.product); //Performs the Act of creating a new product through the use of this function.

      if (createProductResult.ok === true) {
        //Checks if creation of the product executed successfully.
        res.status = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
        res.send(createProductResult); //Sends Success object.
      } else {
        res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
        res.send(createProductResult); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED; //Attaches Unauthorized Status Code to response object.
      res.send({
        //Sends back object with ok set to false and with a message detailing the error (Unauthorized).
        ok: false,
        error: "Access Denied: Insufficient Credentials",
      });
    }
  } catch (error) {
    //Catches unexpected errors and returns a meaningful error object.
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, error: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
  }
};
module.exports = postProduct;
