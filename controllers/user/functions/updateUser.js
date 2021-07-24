const mongoose = require("mongoose");
const Customer = require("../../../models/user.js");

function updateUser(userId, userData) {

  Customer.updateOne({ userId: userId }, userData)
    .then(() => {
        console.log("Update Worked");
    })
    .catch((error) => {
      console.log("Update Failed");
      console.log(error);
    });
}

module.exports = updateUser;
