var { STATUS_CODE } = require("../constants/httpConstants.js");
const updateProduct = require("./functions/updateProduct.js");

const putProduct = async function (req, res, next) {
  try {
    console.log("putProduct");

    if (typeof req.body.credential !== "undefined") {
      if (req.body.credential === "administrator") {
        if (
          typeof req.params.productId !== "undefined" &&
          typeof req.body.productData !== "undefined"
        ) {
          var updateProductResult = await updateProduct(
            req.params.productId,
            req.body.productData
          );

          if (updateProductResult.ok === true) {
            res.statusCode = STATUS_CODE.SUCCESS;
            res.send(updateProductResult);
          } else {
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(updateProductResult);
          }
        } else {
          res.status = STATUS_CODE.UNAUTHORIZED;
          res.send({
            ok: false,
            message: "Insufficient data supplied.",
          });
        }
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          error: "Access Denied: Insufficient Credentials",
        });
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({ ok: false, error: "Access Denied: Unable to Determine User Credentials" });
    }
  } catch (error) {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
    console.log(error);
  }
};
module.exports = putProduct;
