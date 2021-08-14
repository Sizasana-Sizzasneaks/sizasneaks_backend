const createCartItem = require("./functions/createCartItem.js");

//postCartItem functionality
const putCartItem = async function (req, res) {
  console.log("Put Cart Item");

  try {
    if (typeof req.body.product_id !== "undefined"&& typeof req.body.variant !== "undefined" ) {
      if (req.body.credential === "customer") {
        console.log(req.body);
        var createCartItemResult= await createCartItem(
          req.body.userId,
          req.body.product_id,
          req.body.variant
        );

        console.log(createCartItemResult);
        if (createCartItemResult.ok === true) {
          res.status = STATUS_CODE.SUCCESS;
          res.send(createCartItemResult);
        } else {
          res.status = STATUS_CODE.UNAUTHORIZED;
          res.send(createCartItemResult);
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
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};
module.exports = putCartItem;
