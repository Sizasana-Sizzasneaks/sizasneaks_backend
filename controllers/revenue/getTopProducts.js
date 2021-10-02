// Constants
var { STATUS_CODE } = require("../constants/httpConstants.js");
var { USER_CREDENTIAL } = require("../constants/userType.js");

//Helper Functions
const retrieveOrderItem = require("../orders/functions/retrieveOrderItem.js");
const generateTopProducts = require("./functions/generateTopProducts.js");

const getTopProducts = async function (req, res) {
  try {
    if (req.body.credential === USER_CREDENTIAL.ADMINISTRATOR) {
      //Only Administrators are able to get Revenue Data.

      //Create Search Object
      //Add Not Cancelled
      var search = { orderItemCancelled: false };

      //Get 30 Days ago Date
      var thirtyDayMark = new Date();
      thirtyDayMark.setDate(thirtyDayMark.getDate() - 30);
      console.log(thirtyDayMark);
      // Add Date Search Criteria to Search Object
      search = {
        ...search,
        createdAt: { $gt: thirtyDayMark, $lt: new Date() },
      };
      // Get Order Items
      var retrieveOrderItemResult = await retrieveOrderItem(search, {});

      if (retrieveOrderItemResult.ok) {
        var generateTopProductsResult = await generateTopProducts(
          retrieveOrderItemResult.data
        );

        if (generateTopProductsResult.ok) {
          res.status = STATUS_CODE.SUCCESS;
          res.send(generateTopProductsResult);
        } else {
          res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
          res.send(generateTopProductsResult);
        }
      } else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        res.send(retrieveOrderItemResult);
      }
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
