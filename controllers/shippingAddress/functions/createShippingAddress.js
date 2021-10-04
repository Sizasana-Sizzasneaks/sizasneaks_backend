const mongoose = require("mongoose");
const Customer = require("../../../models/Customer.js");

async function createShippingAddress(
  userId,
  addressName,
  firstName,
  lastName,
  addressLineOne,
  addressLineTwo,
  city,
  province,
  country,
  zipCode,
  contactNumber,
  deliveryInstructions
) {
  console.log("add to Users shipping adr");
  // check arguments are not undefined
  if (typeof userId !== "undefined") {
    // create a projection to query the database
    var shippingAddress = {
      addressName: addressName,
      firstName:firstName,
      lastName: lastName,
      addressLineOne: addressLineOne,
      addressLineTwo: addressLineTwo,
      city: city,
      province: province,
      country: country,
      zipCode: zipCode,
      contactNumber: contactNumber,
      deliveryInstructions:deliveryInstructions
    };

    // use Moongose API to search through the user
    // and updating user details by adding a shopping cart item
    return Customer.findOneAndUpdate(
      { userId: userId },
      { $push: { "shippingAddresses": shippingAddress } }
    )
      .then(() => {
        return { ok: true, message: "Shipping Address added" };
      })
      .catch((error) => {
        console.log(error);
        return { ok: false, message: "Failed To Add Shipping Address" };
      });
  } else {
    return { ok: false, message: "Insufficient data supplied" };
  }
}

module.exports = createShippingAddress;
