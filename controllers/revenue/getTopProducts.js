// Constants
var { STATUS_CODE } = require("../constants/httpConstants.js");
var { USER_CREDENTIAL } = require("../constants/userType.js");

const getTopProducts = async function (req, res) {
  try {
    if (req.body.credential === USER_CREDENTIAL.ADMINISTRATOR) {
      //Only Administrators are able to get Revenue Data.
    } else {
      //Sending back a unauthorized response when the user is not of type customer.
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        message: "Access Denied: Insufficient Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, message: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};

module.exports = getTopProducts;
