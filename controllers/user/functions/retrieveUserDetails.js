const { response } = require("express");
const mongoose = require("mongoose");
const Customer = require("../../../models/Customer.js");

function retrieveUserDetails(userId, projection) {
  
  // using Mongoose API Find search using the userID 
  return Customer.find({ userId: userId }, projection)
    .then((docs) => {
      return { ok: true, data: docs[0] };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, error: "Failed to Get User Details" };
    });
}

module.exports = retrieveUserDetails;
