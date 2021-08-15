var { STATUS_CODE } = require("../constants/httpConstants.js");
const updateCartItemQuantity = require("./functions/updateCartItemQuantity.js");
//This Route receives a product_id variable, option object(color, size) and a newQuanity variable.
async function patchCartItem(req, res, next) {
  try {
    if (
      typeof req.body.product_id !== "undefined" &&
      typeof req.body.option.size !== "undefined" &&
      typeof req.body.option.color !== "undefined" &&
      typeof req.body.newQuantity !== "undefined"
    ) {
      if (req.body.credential === "customer") {
        var updateCartItemQuantityResult = await updateCartItemQuantity(
          req.body.userId,
          req.body.product_id,
          req.body.option,
          req.body.newQuantity
        );

        if (updateCartItemQuantityResult.ok === true) {
          res.status = STATUS_CODE.SUCCESS;
          res.send(updateCartItemQuantityResult);
        } else {
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send(updateCartItemQuantityResult);
        }
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          error: "Access Denied - Unauthorized Credentials",
        });
      }
    } else {
      res.status = STATUS_CODE.BAD_REQUEST;
      res.send({
        ok: false,
        error: "Insufficient Data Supplied",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
}

module.exports = patchCartItem;
