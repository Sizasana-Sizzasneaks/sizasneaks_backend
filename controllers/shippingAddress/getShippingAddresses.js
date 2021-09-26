const retrieveShippingAddresses = require("./functions/retrieveShippingAddresses.js");
var { STATUS_CODE } = require("../constants/httpConstants.js");

const getShippingAddresses = async function (req, res, next) {
  console.log("Get Shipping Addresses");
  try {
    if (req.body.credential === "customer") {
      var shippingAddressesResult = await retrieveShippingAddresses(
        req.body.userId
      );

      if (shippingAddressesResult.ok === true) {
        res.status = STATUS_CODE.SUCCESS;
        res.send(shippingAddressesResult);
      } else {
        res.status = STATUS_CODE.BAD_REQUEST;
        res.send(shippingAddressesResult);
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({ ok: false, message: "Access Denied" });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, message: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};
module.exports = getShippingAddresses;
