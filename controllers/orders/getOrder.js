const { USER_CREDENTIAL } = require("../constants/userType.js");
const { STATUS_CODE } = require("../constants/httpConstants.js");

const retrieveOrders = require("./functions/RetrieveOrders.js");

const getOrder = async function (req, res, next) {
  try {
    console.log("Get Order");
    //Check if OrderId was supplied
    if (typeof req.query.orderId !== "undefined") {
      var search = {}; //Search object for retrieving order.
      var projection = {}; //Projection object for retrieving orders.

      if (req.body.credential === USER_CREDENTIAL.ADMINISTRATOR) {
        //If Request is coming from an Administrator.
        search = { _id: req.query.orderId };
      } else if (req.body.credential === USER_CREDENTIAL.CUSTOMER) {
        //If Request is coming from a Customer.
        search = { _id: req.query.orderId, customer_id: req.body.userId };
      } else {
        //Returning if Credential type is not of Customer or Administrator.
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          message: "Access Denied: Insufficient Credentials",
        });
        return;
      }
      //Performs the act of retrieving a specific order by the way of this function.
      var retrieveOrderByIdResult = await retrieveOrders(search, projection);

      //Checks if retrieving an order executed successfully.
      if (retrieveOrderByIdResult.ok === true) {
        var orderToReturn = retrieveOrderByIdResult.data[0];

        //Checking that order belongs to customer that requested it.
        if (req.body.credential === USER_CREDENTIAL.ADMINISTRATOR || orderToReturn.customer_id === req.body.userId) {
          res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
          res.send({ ok: true, data: orderToReturn }); //Sends order retrieved.
        } else {
          res.status = STATUS_CODE.UNAUTHORIZED;
          res.send({
            ok: false,
            message:
              "Access Denied: You are not authorized to view this order.",
          });
        }
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
    res.send({ ok: false, message: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible for execution failure.
  }
};

module.exports = getOrder;
