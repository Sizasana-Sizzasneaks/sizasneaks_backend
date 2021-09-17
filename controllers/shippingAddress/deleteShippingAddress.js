var { STATUS_CODE } = require("../constants/httpConstants.js");

const retrieveShippingAddressById = require("./functions/retrieveShippingAddressById.js");
const deleteShippingAddress= require("./functions/deleteShippingAddressById.js")

const deleteShippingAddress = async function (req, res) {
  try {
    console.log("Delete Shipping Address");
    //Only Customers can request their own SHipping Addresses
    if (req.body.credential === "customer") {

      //Making sure that an address id is supplied.
      if (typeof req.body.addressId !== "undefined") {
          var deleteShippingAddressResult= await deleteShippingAddress(
            req.body.userId,
            req.body.addressId,
          );
          // Checking of Updating of Shipping address was successful.
          if (deleteShippingAddressByIdResult.ok) {
            //Sending back a corresponding success Response
            res.status = STATUS_CODE.SUCCESS;
            res.send(deleteShippingAddressByIdResult);
          } 
          else {
            res.status = STATUS_CODE.BAD_REQUEST;
            res.send(deleteShippingAddressByIdResult);
          }
      } 
      else {
        res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
        res.send({
          //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
          ok: false,
          message: "Please provide a shipping addressId value",
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

module.exports = deleteShippingAddress;
