const retrieveProductsByCategory = require("./functions/retrieveProductsByCategory.js");

var { STATUS_CODE } = require("../constants/httpConstants.js");

const getProducts = async function (req, res, next) {
  console.log("get Products");

  try {
    var retrieveProductsResult = await retrieveProductsByCategory(
      req.body.credential,
      req.query
    );
    console.log(req.body.credential);
    console.log(req.body.userId);

    if (retrieveProductsResult.ok === true) {
      res.statusCode = STATUS_CODE.SUCCESS;
      res.send(retrieveProductsResult);
    } else {
      res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
      res.send(retrieveProductsResult);
    }
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};

module.exports = getProducts;
