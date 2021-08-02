const retrieveReviews = require("./functions/RetriveReviews.js");
var { STATUS_CODE } = require("../constants/httpConstants.js");



const getReviews = async function (req, res, next){
    console.log("get Reviews");
    if(typeof req.params.product_id !== "undefined"){
        var reviewsResult = await retrieveReviews(
            req.params.product_id
        );
        if (reviewsResult .ok === true){
            res.statusCode = STATUS_CODE.SUCCESS;
            res.send(reviewsResult );
        } else {
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(reviewsResult );
        }
    }else{
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
        ok: false,
        message: "Please provide a Product Id value",
        });
    }
     

    
}
module.exports = getReviews;