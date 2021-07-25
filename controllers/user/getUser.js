var { STATUS_CODE } = require("../constants/httpConstants.js");
const retrieveUserDetails = require("./functions/retrieveUserDetails.js");

const getUser = async function (req, res) {
  console.log("Get User Controller");

  var retrieveUserDetailsResult = await retrieveUserDetails(req.id, 'firstName lastName email');

  if (retrieveUserDetailsResult.ok === true) {
    res.statusCode = STATUS_CODE.SUCCESS;
    res.send(retrieveUserDetailsResult.data);
  } else {
    res.status = STATUS_CODE.UNAUTHORIZED;
    res.send({ ok: false, error: "Backend Error" });
  }
};

module.exports = getUser;
