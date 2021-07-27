const mongoose = require("mongoose");
const Customer = require("../../../models/user.js");
const prepareUserData = require("./prepareUserData.js");

async function updateUser(userId, userData) {

  var data = await prepareUserData(userData);

  return Customer.updateOne({ userId: userId }, data)
    .then(() => {
      console.log("Update Worked");
      return { ok: true };
    })
    .catch((error) => {
      console.log("Update Failed");
      console.log(error);
      return { ok: false, error: error };
    });
}

module.exports = updateUser;
