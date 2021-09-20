var { STATUS_CODE } = require("../constants/httpConstants.js");
var { USER_CREDENTIAL } = require("../constants/userType.js");
const updateOrder = require("./functions/updateOrder.js");

const postOrderPayment = async function (req, res, next) {
  try {
    console.log("Order Payments");
    //Only Customers can request for payment
    if (req.body.credential === USER_CREDENTIAL.CUSTOMER) {
      var search = {};
      var projection = {};

      //Making sure that an billing detail is supplied.
      if (req.body.billingDetails !== "undefined") {
        //Making sure that an order id is supplied.
        if (typeof req.body.orderId !== "undefined") {
          search = { _id: req.body.orderId, customer_id: req.body.userId };
        } else {
          //Attaches Bad Request Status Code to response object.
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send({
            //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
            ok: false,
            message: "Please provide an order ID, check if its valid ",
          });
          return;
        }

        //Performs the act of retrieving a specific order by the way of this function.
        var retrieveOrderByIdResult = await retrieveOrders(search, projection);

        //Checks if retrieving an order executed successfully.
        if (retrieveOrderByIdResult.ok === true) {
          var orderToReturn = retrieveOrderByIdResult.data[0];

          //Checking that order belongs to customer that requested it.
          if (orderToReturn.customer_id === req.body.userId) {
            // simulate payment
            var postOrderPaymentResult = await orderPayment(
              req.body.userId,
              req.body.orderId,
              req.body.orderToReturn,
              req.body.billingDetails
            );

            // Checking of payment was successful.
            if (postOrderPaymentResult.ok) {
              const orderData = {
                paymentComplete: true,
                paymentTime: new Date(),
              };
              // Update Order with Completed Details Payment
              var updateOrderResult = await updateOrder(
                req.body.orderId,
                orderData
              );

              if (updateOrderResult.ok) {
                res.status = STATUS_CODE.SUCCESS;
                res.send({ok:true, message: "Payment Complete"});
              } else {
                res.status = STATUS_CODE.BAD_REQUEST;
                res.send(updateOrderResult);
              }

              //Sending back a corresponding success Response
              res.status = STATUS_CODE.SUCCESS;
              res.send(postOrderPaymentResult);
            } else {
              res.status = STATUS_CODE.BAD_REQUEST;
              res.send(postOrderPaymentResult);
            }
            res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
            res.send({ ok: true });
          } else {
            res.status = STATUS_CODE.UNAUTHORIZED;
            res.send({
              ok: false,
              message: "Access Denied: You are not authorized.",
            });
          }
        } else {
          res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
          res.send(retrieveOrderByIdResult); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
        }
      } else {
        //Sending back a unauthorized response when the user is not of type customer.
        res.status = STATUS_CODE.BAD_REQUEST;
        res.send({
          ok: false,
          error: "Billing details not supplied",
        });
      }
    } else {
      //Sending back a unauthorized response when the user is not of type customer.
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        error: "Access Denied Insufficient Credentials",
      });
    }
  } catch (error) {
    //Catches unexpected errors and returns a meaningful error object.
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, message: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible for execution failure.
  }
};

module.exports = postOrderPayment;
