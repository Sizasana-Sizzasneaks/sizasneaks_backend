const mongoose = require("mongoose");
const Customer = require("../../../models/user.js");

function updateUser(userId, userData) {
  return Customer.updateOne({ userId: userId }, userData)
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
