var { STATUS_CODE } = require("../constants/httpConstants.js");

const getUser = function (req, res) {
  console.log("Get User Controller");

  res.statusCode = STATUS_CODE.SUCCESS;
  res.send({firstName: "Natasha"})
 
};

module.exports = getUser;
