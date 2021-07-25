const mongoose = require("mongoose");
const Customer = require("../../../models/user.js");

function retrieveUserDetails(userId, projection) {
  return Customer.find({ userId: userId }, projection)
    .then((docs) => {
      return { ok: true, data: docs[0] };
    })
    .catch((error) => {
      return { ok: false, error: "Failed to Get User Details" };
    });
}

module.exports = retrieveUserDetails;
