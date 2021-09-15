const retrieveOrders = require("./functions/RetrieveOrders.js");
//const prepareOrders = require("./functions/prepareReviews.js"); - might need this later for proper data display
var { STATUS_CODE } = require("../constants/httpConstants.js");

const getOrders = async function (req,res,next){
    console.log("Get Orders");
    try {
        //Performing retrieval of all orders made on the platform  
      var ordersResult = await retrieveOrders();
      res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
      res.send(ordersResult); //Sending object containing result message (error).

    } catch (error) {
        console.log(error);
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
        res.send({ ok: false, error: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
    
    }
};
module.exports = getOrders;