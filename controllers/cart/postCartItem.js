var { STATUS_CODE } = require("../constants/httpConstants.js");
const createCartItem = require("./functions/createCartItem.js");
const matchCartItem = require("./functions/matchCartItem.js");
const updateCartItemQuantity = require("./functions/updateCartItemQuantity.js");

//postCartItem functionality
const postCartItem = async function (req, res) {
  console.log("Post Cart Item");

  try {
    if (
      typeof req.body.product_id !== "undefined" &&
      typeof req.body.variant !== "undefined"
    ) {
      if (req.body.credential === "customer") {
        console.log(req.body);

        var matchCartItemResult = await matchCartItem(
          req.body.userId,
          req.body.product_id,
          req.body.variant
        );

        if (matchCartItemResult.ok === true) {
          var quantity = matchCartItemResult.data.quantity;
          var newQuantity = quantity + 1;
          var updateCartItemQuantityResult = await updateCartItemQuantity(
            req.body.userId,
            matchCartItemResult.data._id,
            newQuantity
          );

          if (updateCartItemQuantityResult.ok === true) {
            res.status = STATUS_CODE.SUCCESS;
            res.send(updateCartItemQuantityResult);
          } else {
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(updateCartItemQuantityResult);
          }
        } else {
          var createCartItemResult = await createCartItem(
            req.body.userId,
            req.body.product_id,
            req.body.variant
          );

          
          if (createCartItemResult.ok === true) {
            res.status = STATUS_CODE.SUCCESS;
            res.send(createCartItemResult);
          } else {
            res.status = STATUS_CODE.UNAUTHORIZED;
            res.send(createCartItemResult);
          }
        }
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          error: "Insufficient Credentials",
        });
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        error: "Insufficient Data Supplied",
      });
    }
  } catch (error){
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};
module.exports = postCartItem;
