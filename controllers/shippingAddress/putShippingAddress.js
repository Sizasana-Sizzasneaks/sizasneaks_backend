const updateShippingAddressById = require("./functions/updateShippingAddressById.js");

const putShippingAddress = async function (req, res) {
  try {
    console.log("Put Shipping Address");
    //Only Customers can request their own SHipping Addresses
    if (req.body.credential === "customer") {
      //Making sure that an address id and AddressData are supplied.
      if (
        typeof req.body.addressId !== "undefined" &&
        typeof req.body.addressData !== "undefined"
      ) {
        var updateShippingAddressByIdResult = await updateShippingAddressById(
          req.body.userId,
          req.body.addressId,
          req.body.addressData
        );
        // Checking of Updating of Shipping address was successful.
        if (updateShippingAddressByIdResult.ok) {
          //Sending back a corresponding success Response
          res.status = STATUS_CODE.SUCCESS;
          res.send(updateShippingAddressByIdResult);
        } else {
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send(updateShippingAddressByIdResult);
        }
      } else {
        res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
        res.send({
          //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
          ok: false,
          message:
            "Please provide a shipping addressId value and addressData to update the corresponding address.",
        });
      }
    } else {
      //Sending back a unauthorized response when the user is not of type customer.
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        message: "Access Denied Insufficient Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, message: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};

module.exports = putShippingAddress;
