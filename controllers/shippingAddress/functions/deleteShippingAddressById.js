const mongoose = require("mongoose");
const Customer = require("../../../models/Customer.js");

async function deleteShippingAddressById(userId, addressId) {
  try {
    // use Moongose API 
    // deleting an item within an array within an collection is a update 
    // $pull refers to as removing a specific instance in this case 
    // deleting a specific address by using the Id
    return Customer.updateOne(
      {
        userId: userId,
      },
      {
        $pull: {
          shippingAddresses: {
            
            _id: addressId,
          },
        },
      }
    )
      .then(() => {
        // return value for the function
        return { ok: true, message: "Shipping Address deleted Successfully" };
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
          return { ok: false, message: "Failed to delete Shipping Address" };
        }
      });
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Unexpected Error when deleting a users shipping address",
    };
  }
}

module.exports = deleteShippingAddressById;
