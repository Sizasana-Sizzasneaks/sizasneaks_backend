const createError = require("http-errors");
const mongoose = require("mongoose");

var { STATUS_CODE } = require("../constants/httpConstants.js");

const retrieveProductById = require("./functions/retrieveProductById.js");

const getProduct = async function (req, res, next) {

  if (typeof req.params.productId !== "undefined") {

    var retrieveProductByIdResult = await retrieveProductById(
      req.body.credential,
      req.params.productId
    );

    if (retrieveProductByIdResult.ok === true) {
      res.statusCode = STATUS_CODE.SUCCESS;
      res.send(retrieveProductByIdResult);
    } else {
      res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
      res.send(retrieveProductByIdResult);
    }
  } else {
    res.status = STATUS_CODE.UNAUTHORIZED;
    res.send({
      ok: false,
      message: "Please provide a Product Id value",
    });
  }

};
module.exports = getProduct;
