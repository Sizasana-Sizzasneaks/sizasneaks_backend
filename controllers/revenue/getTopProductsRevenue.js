// Product Revenue Functionailty - Ameer

// Inputs
// -ProductId

// Process
// - Check is Admin
// - Get all Order Items - (for the past 6 Month - Including Current Month & not cancelled & match productId)
// 	- Determine current month and subtract 5 from it to get Starting Month
// 	- Get Order items from begining of starting month till Now.
// - Run Loop - Helper Function
// 	- Make Array With Groups - [{month:5, quantity:0, revenue:0, profit:0},..]
// 	- (Loop) Take One Item - Check Month of timestamp,
// 		Then increment quantity with item quantity,
// 		Then Calculate Revenue (sellingPriceAmount * quantity)
// 		Then Calculate Profit (((sellingPriceAmount - totalSupplierCost) - 15%) * quantity)
// 	- Return  [{month:5, quantity:0, revenue:0, profit:0},..]

// Outputs
// 	- Return  [{month:5, quantity:0, revenue:0, profit:0},..]

const retrieveOrderItem = require("../orders/functions/retrieveOrderItem.js");
const generateTopProductsRevenue = require("./functions/generateTopProductsRevenue.js");

var { STATUS_CODE } = require("../constants/httpConstants.js");
var { USER_CREDENTIAL } = require("../constants/userType.js");

const getTopProductsRevenue = async function (req, res) {
  try {
    if (typeof req.params.productId !== "undefined") {
      if (req.body.credential === USER_CREDENTIAL.ADMINISTRATOR) {
        //Only Administrators are able to get Revenue Data.

        var search = { orderItemCancelled: false };

        var sixMonthMark = new Date();
        sixMonthMark.setMonth(sixMonthMark.getMonth() - 4);
        sixMonthMark.setDate(0);
        console.log(sixMonthMark);

        search = {
          ...search,
          productId: req.params.productId,
          createdAt: { $gt: sixMonthMark, $lt: new Date() },
        };

        var retrieveOrderItemResult = await retrieveOrderItem(search, {});

        if (retrieveOrderItemResult.ok) {
          var generateTopProductsRevenueResult =
            await generateTopProductsRevenue(
              retrieveOrderItemResult.data,
              sixMonthMark.getMonth()
            );

          if (generateTopProductsRevenueResult.ok) {
            res.status = STATUS_CODE.SUCCESS;
            res.send(generateTopProductsRevenueResult);
          } else {
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(generateTopProductsResult);
          }
        } else {
          if (retrieveOrderItemResult.message === "No order items found") {
            generateTopProductsRevenueResult = await generateTopProductsRevenue(
              [],
              sixMonthMark.getMonth()
            );
            if (generateTopProductsRevenueResult.ok) {
              res.status = STATUS_CODE.SUCCESS;
              res.send(generateTopProductsRevenueResult);
            } else {
              res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
              res.send(generateTopProductsResult);
            }
          } else {
            res.status = STATUS_CODE.BAD_REQUEST;
            res.send(retrieveOrderItemResult);
          }
        }
      } else {
        //Sending back a unauthorized response when the user is not of type customer.
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          message: "Access Denied: Insufficient Credentials",
        });
      }
    } else {
      res.status = STATUS_CODE.BAD_REQUEST;
      res.send({
        ok: false,
        message: "Product ID not supplied",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, message: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};

module.exports = getTopProductsRevenue;
