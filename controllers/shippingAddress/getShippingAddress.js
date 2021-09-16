var { STATUS_CODE } = require("../constants/httpConstants.js");

const retrieveShippingAddressById = require("./functions/retrieveShippingAddressById.js");

const getShippingAddress = async function (req, res) {
  try {
    console.log("Get Shipping Address");
    //Only Customers can request their own SHipping Addresses
    if (req.body.credential === "customer") {
      //Making sure that an address id is supplied.
      if (typeof req.params.addressId !== "undefined") {
        var retrieveShippingAddressByIdResult =
          await retrieveShippingAddressById(
            req.body.userId,
            req.params.addressId
          );
        // Checking of Retrieving of Shipping address was successful.
        if (retrieveShippingAddressByIdResult.ok) {
          //Sending back a corresponding success Response
          res.status = STATUS_CODE.SUCCESS;
          res.send(retrieveShippingAddressByIdResult);
        } else {
          //Sending back a corresponding failure Response
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send(retrieveShippingAddressByIdResult);
        }
      } else {
        res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
        res.send({
          //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
          ok: false,
          message: "Please provide a shipping address id value",
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
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};

module.exports = getShippingAddress;
