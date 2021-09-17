const retrieveProductsByCategory = require("./functions/retrieveProductsByCategory.js");

var { STATUS_CODE } = require("../constants/httpConstants.js");
const retrieveReviews = require("../reviews/functions/RetriveReviews.js");

const getProducts = async function (req, res, next) {
  console.log("Get Products");

  try {
    var retrieveProductsResult = await retrieveProductsByCategory(
      //Performs the act of retrieving the products by the way of this function.
      req.body.credential, //Supplies the credential type of the client that has invoked this function.
      req.query //Supplies query parameters that are used to search for products by category
    );

    //Checks if retrieving the products executed successfully.
    if (retrieveProductsResult.ok === true) {
      var products = retrieveProductsResult.data;

      res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
      res.send({ ok: true, data: products }); //Sends product retrieved.
    } else {
      res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
      res.send(retrieveProductsResult); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
    }
  } catch (error) {
    //Catches unexpected errors and returns a meaningful error object.
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, error: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
  }
};

module.exports = getProducts;
