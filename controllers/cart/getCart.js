const createError = require("http-errors");
const mongoose = require("mongoose");

const retrieveCartByUserId = require("./functions/retreiveCartByUserId.js");
const prepareCartData = require("./functions/prepareCartData.js");
const calculateCartSummary = require("./functions/calculateCartSummary");

var { STATUS_CODE } = require("../constants/httpConstants.js");

const getCart = async function (req, res, next) {
  try {
    // get customers cart given to retrieveCartByUserIdResult
    var retrieveCartByUserIdResult = await retrieveCartByUserId(
      req.body.userId
    );
    if (retrieveCartByUserIdResult.ok === true) {
      
      // prepare cart data
      var prepareCartDataResult = await prepareCartData(
        retrieveCartByUserIdResult.data
      );
      // get cart summary calculation details 
      if (prepareCartDataResult.ok === true) {
        var calculateCartSummaryResult = await calculateCartSummary(
          prepareCartDataResult.data
        );
        //send back the cart or error message 
        if (calculateCartSummaryResult.ok === true) {
          res.status = STATUS_CODE.SUCCESS;
          res.send({ ok: true, data: calculateCartSummaryResult.data });
        } 
        else {
          res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
          res.send(calculateCartSummaryResult);
        }
      } // send back error message if prepare cart was not a success
      else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        res.send(prepareCartDataResult);
      }
    } // if retrieving users id fails send error
    else {
      res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
      res.send(retrieveCartByUserIdResult);
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unknown Server Error" });
  }
};

module.exports = getCart;
