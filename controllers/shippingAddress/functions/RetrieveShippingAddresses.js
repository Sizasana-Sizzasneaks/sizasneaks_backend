const Customer = require("../../../models/Customer.js");

function retrieveShippingAddresses(userId) {
  //Checks that all function arguments are not undefined before execution.
  if (typeof userId !== "undefined") {
    //Performs the search using the Mongoose API.
    return Customer.find({ userId: userId }, { shippingAddresses: 1, _id: 0 })
      .then((docs) => {
        if (docs.length !== 0) {
          return { ok: true, data: docs[0].shippingAddresses };
        } else {
          return {
            ok: false,
            data: docs,
            message: "No Shipping Address found for this user",
          };
        }
      })
      .catch((error) => {
        return { ok: false, message: "Error When Getting shipping addresses" };
      });
  } else {
    return {
      ok: false,
      message: "User ID was not supplied",
    };
  }
}
module.exports = retrieveShippingAddresses;
