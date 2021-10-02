// Constants
var { STATUS_CODE } = require("../constants/httpConstants.js");
var { USER_CREDENTIAL } = require("../constants/userType.js");

//Helper Functions
const retrieveOrderItem = require("../orders/functions/retrieveOrderItem.js");

const getTopProducts = async function (req, res) {
  try {
    //Only Administrators are able to get Revenue Data.
    // Get Order Items

    var retrieveOrderItemResult = await retrieveOrderItem({}, {});

    if (retrieveOrderItemResult.ok) {
      res.status = STATUS_CODE.SUCCESS;
      res.send(retrieveOrderItemResult);
    } else {
      res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
      res.send(retrieveOrderItemResult);
    }

    
    // if (req.body.credential === USER_CREDENTIAL.ADMINISTRATOR) {

    // } else {
    //   //Sending back a unauthorized response when the user is not of type customer.
    //   res.status = STATUS_CODE.UNAUTHORIZED;
    //   res.send({
    //     ok: false,
    //     message: "Access Denied: Insufficient Credentials",
    //   });
    // }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, message: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};

module.exports = getTopProducts;
