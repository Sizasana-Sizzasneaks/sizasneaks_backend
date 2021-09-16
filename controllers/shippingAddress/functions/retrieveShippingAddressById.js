const Customer = require("../../../models/Customer.js");

async function retrieveShippingAddressById(userId, addressId) {
  try {
    return Customer.find(
      { userId: userId },
      {
        _id: 0,
        shippingAddresses: { $elemMatch: { _id: addressId } },
      }
    )
      .lean()
      .then((docs) => {
        if (docs.length !== 0) {
          return { ok: true, data: docs[0] }; //Returning single first document that was found.
        } else {
          return { ok: false, data: docs, message: "No address match found" }; //Returning when no matching Address is found.
        }
      })
      .catch((error) => {
        if (
          //Checking if the error thrown is due to an invalid value specified on the "_id" variable.
          error.path === "_id" &&
          error instanceof mongoose.CastError &&
          error.kind === "ObjectId"
        ) {
          return { ok: false, message: "Invalid Address Id" }; //Returning when the supplied search object contains an invalid address id value (invalid format).
        } else {
          console.log(error);
          return {
            ok: false,
            message: "Error When retrieving a users shipping address",
          }; //Return a general error when the retrieving of products is unsuccessful.
        }
      });
  } catch {
    return {
      ok: false,
      message: "Unexpected Error when retrieving a users shipping address",
    };
  }
}

module.exports = retrieveShippingAddressById;
