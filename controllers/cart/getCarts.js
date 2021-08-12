const createError = require("http-errors");
const mongoose = require("mongoose");

var { STATUS_CODE } = require("../constants/httpConstants.js");

const availableProduct=require("./functions/availabilityProduct.js");

const getCart=async function(req, res, next){
    // check if productId is valid
    try {
        if(typeof req.params.product_id!== "undefined"){
            var availabileProductResult=await availableProduct(
                req.body.credential,
                req.params.productId
            );

            if(availabileProductResult.ok === true){
                res.statusCode = STATUS_CODE.SUCCESS;
                res.send(retrieveProductByIdResult);
            } else {
                res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                res.send(retrieveProductByIdResult);
            }
        }else{
            res.status = STATUS_CODE.UNAUTHORIZED;
            res.send({
                ok: false,
                message: "Please provide a Product Id value",
            });
        }
    }catch {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        res.send({ ok: false, error: "Unkown Server Error" });
    }
};

module.exports=getCart;