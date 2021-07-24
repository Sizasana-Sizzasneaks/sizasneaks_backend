const updateUser = require("./functions/updateUser.js");

const patchUser = function (req, res) {
  console.log("Patch User Controller");

  
  updateUser(req.id,req.body);
};

module.exports = patchUser;
