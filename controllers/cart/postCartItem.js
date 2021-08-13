const createProductbyid = require("./functions/createCartItem.js");

//postCartItem functionality
const addToCart = async function (req, res) {
  console.log("Create product");

  try {
    if (typeof req.params.product_id != "undefined") {
      if (req.body.credential === "customer") {
        console.log(req.body);
        var createProductResult = await createProductbyid(
          req.body.userId,
          req.params.product_id,
          req.body
        );

        console.log(createProductResult);
        if (createProductResult.ok === true) {
          res.status = STATUS_CODE.SUCCESS;
          res.send(createProductResult);
        } else {
          res.status = STATUS_CODE.UNAUTHORIZED;
          res.send(createProductResult);
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
        error: "Product Id not supplied",
      });
    }
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};
module.exports = addToCart;
