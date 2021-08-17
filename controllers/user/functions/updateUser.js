const mongoose = require("mongoose");
const Customer = require("../../../models/Customer.js");
const prepareUserData = require("./prepareUserData.js");

async function updateUser(userId, userData) {
  // once user is created with a displayName 
  var data = await prepareUserData(userData);

  // using Mongoose API to update the customer detail 
  // by updating the displayName field
  return Customer.updateOne({ userId: userId }, data)
    .then(() => {
      return { ok: true, error: "Update Worked" };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, error: error };
    });
}

module.exports = updateUser;
