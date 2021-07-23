var admin = require("firebase-admin");

var createNewUser = require("../user/functions/createNewUser.js");

const postUser = function (req, res) {
  console.log("Post User Controller");

  // Take User ID and create new User
  createNewUser(req.id);

};

module.exports = postUser;
