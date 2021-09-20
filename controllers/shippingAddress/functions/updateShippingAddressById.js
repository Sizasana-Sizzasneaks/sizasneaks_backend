const  mongoose  = require("mongoose");
const Customer = require("../../../models/Customer.js");

async function updateShippingAddressById(userId, addressId, addressData) {
  try {
    return Customer.updateOne(
      {
        userId: userId,
        "shippingAddresses._id": addressId,
      },
      {
        $set: {
          "shippingAddresses.$": addressData,
        },
      }
    )
      .then(() => {
        return { ok: true, message: "Shipping Address Updated Successfully" };
      })
      .catch((error) => {
        if (
          //Checking if the error thrown is due to an invalid value specified on the "_id" variable.
          error.path === "_id" &&
          error instanceof mongoose.CastError &&
          error.kind === "ObjectId"
        ) {
          return { ok: false, message: "Invalid Shipping Id Supplied" }; //Returning when the supplied search object contains an invalid product id value (invalid format).
        } else {
          return { ok: false, message: "Failed to Update Shipping Address" };
        }
      });
  } catch {
    return {
      ok: false,
      message: "Unexpected Error when updating a users shipping address",
    };
  }
}

module.exports = updateShippingAddressById;
