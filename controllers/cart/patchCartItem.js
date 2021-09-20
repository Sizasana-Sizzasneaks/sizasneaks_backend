var { STATUS_CODE } = require("../constants/httpConstants.js");
const updateCartItemQuantity = require("./functions/updateCartItemQuantity.js");
const matchCartItem = require("./functions/matchCartItem.js");
//This Route receives a product_id variable, option object(color, size) and a newQuanity variable.
async function patchCartItem(req, res, next) {
  try {
    if (
      // check argument are not undefined
      typeof req.body.product_id !== "undefined" &&
      typeof req.body.option.size !== "undefined" &&
      typeof req.body.option.color !== "undefined" &&
      typeof req.body.newQuantity !== "undefined"
    ) {
      //Checking if credential is set to customer, only a customer can a make changes to their shopping cart.
      if (req.body.credential === "customer") {
        var matchCartItemResult = await matchCartItem(
          req.body.userId,
          req.body.product_id,
          req.body.option
        );
        //Checking to see if the there was any cart item match.
        if (matchCartItemResult.ok === true) {
          var updateCartItemQuantityResult = await updateCartItemQuantity(
            req.body.userId,
            matchCartItemResult.data._id,
            req.body.newQuantity
          );

          if (updateCartItemQuantityResult.ok === true) {
            //Sending back a corresponding success Response
            res.status = STATUS_CODE.SUCCESS;
            res.send(updateCartItemQuantityResult);
          } else {
            //Sending back a corresponding failure Response
            res.status = STATUS_CODE.BAD_REQUEST;
            res.send(updateCartItemQuantityResult);
          }
        } else {
          //Sending back a corresponding failure Response
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send(matchCartItemResult);
        }
      } else {
        //Sending back a unauthorized response when the user is not of type customer.
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          message: "Access Denied - Unauthorized Credentials",
        });
      }
    } else {
      //Sending back a Bad request response when not all data is supplied.
      res.status = STATUS_CODE.BAD_REQUEST;
      res.send({
        ok: false,
        message: "Insufficient Data Supplied",
      });
    }
  } catch (error) {
    console.log(error);
    //Sending back a failure response due to an unexpected error being thrown.
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, message: "Unknown Server Error" });
  }
}

module.exports = patchCartItem;
