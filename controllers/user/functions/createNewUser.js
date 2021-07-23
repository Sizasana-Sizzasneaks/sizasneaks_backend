const mongoose = require("mongoose");
const Customer = require("../../../models/user.js");

function createNewUser(userId) {
  var customer = new Customer({ userId: userId });

  customer
    .save()
    .then(() => {
      console.log("Customer Created!");
    })
    .catch((error) => {
      console.log("Failed Save");
      console.log(error);
    });
}

module.exports = createNewUser;
