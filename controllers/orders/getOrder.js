const createError = require("http-errors");
const mongoose = require("mongoose");

const { STATUS_CODE } = require("../constants/httpConstants.js");

const retrieveOrders = require("./functions/RetrieveOrders.js");

const getOrder = async function (req, res, next) {
  try {
    console.log("Get Order");
    if (typeof req.params.orderID !== "undefined") {
      //Checks that all function arguments are not undefined before execution.
      var retrieveOrderByIdResult = await retrieveOrders(
        //Performs the act of retrieving a specific order by the way of this function.
        req.body.credential,
        req.params.orderId
      );
      //Checks if retrieving an order executed successfully.
      if (retrieveOrderByIdResult.ok === true) {
        res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
        res.send(retrieveOrderByIdResult); //Sends order retrieved.
      } else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
        res.send(retrieveOrderByIdResult); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
      }
    } else {
      res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
      res.send({
        //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
        ok: false,
        message: "Please provide a valid Order Id value",
      });
    }   
  } catch (error) {
    //Catches unexpected errors and returns a meaningful error object.
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, error: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible for execution failure.
  }
};

module.exports = getOrder;