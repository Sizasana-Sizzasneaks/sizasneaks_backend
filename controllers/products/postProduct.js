const createProduct = require("./functions/createProduct.js");

const postProduct = async function (req, res) {
  console.log("create Product Controller");

  try {
    if (req.body.credential === "administrator") { //change it to administator when done
      console.log(req.body);
      var createProductResult = await createProduct(req.body.product);

      console.log(createProductResult);
      if (createProductResult.ok === true) {console.log()
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
        error: "UNAUTHORIZED USER",
      });
    }
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};
module.exports = postProduct;
