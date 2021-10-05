var { STATUS_CODE } = require("../constants/httpConstants.js");
const updateOrder = require("./functions/updateOrder.js");

const putOrder = async function (req, res, next) {
  try {
    console.log("Put Order status");

    //Checks that all function arguments are not undefined before execution.
    if (typeof req.body.credential !== "undefined") {

      //Checking if the credential supplied is of type Administrator.
      if (req.body.credential === "administrator") {

        //Checks that all function arguments are not undefined before execution.
        if (
          typeof req.params.orderId !== "undefined" &&
          typeof req.body.orderData !== "undefined"
        ) {

          //Performs the act of updating a specific order by the way of this function, supplying the order Id and the new order data.
          var updateOrderResult = await updateOrder(
            req.params.orderId,
            req.body.orderData
          );

          //Checks if order update executed successfully.
          if (updateOrderResult.ok === true) {
            res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
            res.send(updateOrderResult); //Sends Success Object.
          } else {
            res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
            res.send(updateOrderResult); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
          }
        } else {
          res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
          //Sends back object with ok set to false and with a message detailing the reason for execution failure.
          res.send({ ok: false, message: "Insufficient data supplied." });
        }
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED; //Attaches Unauthorized Status Code to response object.
        //Sends back object with ok set to false and with a message detailing the error (Unauthorized).
        res.send({
          ok: false,
          message: "Access Denied: Insufficient Credentials",
        });
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED; //Attaches Unauthorized Status Code to response object.
      //Sends back object with ok set to false and with a message detailing the error (Unable to determine user credential).
      res.send({
        ok: false,
        error: "Access Denied: Unable to determine User Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, message: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
  }
};

module.exports = putOrder;
