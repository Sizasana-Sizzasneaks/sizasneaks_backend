const createError = require("http-errors");
const mongoose = require("mongoose");

var { STATUS_CODE } = require("../constants/httpConstants.js");

const retrieveProductById = require("./functions/retrieveProductById.js");

const getProduct = async function (req, res, next) {
  try {
    console.log("Get Product");
    if (typeof req.params.productId !== "undefined") {
      //Checks that all function arguments are not undefined before execution.
      var retrieveProductByIdResult = await retrieveProductById(
        //Performs the act of retrieving the specific product by the way of this function.
        req.body.credential,
        req.params.productId
      );
      //Checks if retrieving the product executed successfully.
      if (retrieveProductByIdResult.ok === true) {
        res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
        res.send(retrieveProductByIdResult); //Sends product retrieved.
      } else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
        res.send(retrieveProductByIdResult); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
      }
    } else {
      res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
      res.send({
        //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
        ok: false,
        message: "Please provide a valid Product Id value",
      });
    }
  } catch (error) {
    //Catches unexpected errors and returns a meaningful error object.
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, message: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible for execution failure.
  }
};
module.exports = getProduct;
