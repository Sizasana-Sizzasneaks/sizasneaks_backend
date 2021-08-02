const { STATUS_CODE } = require("../constants/httpConstants.js");
const retrieveReviews = require("./functions/RetriveReviews.js");
const retrieveReviews = require("./functions/RetriveReviews.js");

// var { STATUS_CODE } = require("../constants/httpConstants.js");

const getReviews = async function (req, res, next){
    console.log("get Reviews");
    var retrieveReviews = await retrieveReviews(
        // req.body.credential,
        req.query
    );
    if (retrieveReviews.ok === true){
        res.statusCode = STATUS_CODE.SUCCESS;
        res.send(retrieveReviews);
    } else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        res.send(retrieveReviews);
    }
};
module.exports = getReviews;