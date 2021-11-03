const { response } = require("express");
const mongoose = require("mongoose");
const Customer = require("../../../models/Customer.js");

function retrieveUserDetails(userId, projection) {
  try {
    // using Mongoose API Find search using the userID
    return Customer.find({ userId: userId }, projection)
      .then((docs) => {
        if (docs.length !== 0) {
          return { ok: true, data: docs[0] };
        } else {
          return { ok: false, data: docs, message: "User Not Found" };
        }
      })
      .catch((error) => {
        console.log(error);
        return { ok: false, error: "Failed to Get User Details" };
      });
  } catch {
    return { ok: false, message: "Internal Error" };
  }
}

module.exports = retrieveUserDetails;
