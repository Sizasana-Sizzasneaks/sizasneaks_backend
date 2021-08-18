const mongoose = require("mongoose");
const Customer = require("../../../models/Customer.js");
const prepareUserData = require("./prepareUserData.js");

async function createNewUser(userId, userData) {
  
  // creating a users display name
  var data = await prepareUserData(userData);
  // creating a customer model
  var customer = await new Customer({ userId: userId, ...data });

  return customer
    .save()
    .then(() => {
      return { ok: true };
    })
    .catch((error) => {
      if (error.code === 11000) {
        return {
          ok: false,
          message: "User Already Exists - User ID already in use.",
        };
      } else {
        return { ok: false, message: "Failed To Create New User" };
      }
    });
}

module.exports = createNewUser;
