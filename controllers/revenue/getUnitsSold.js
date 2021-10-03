const calculateUnitsSold = require("../revenue/functions/calculateUnitsSold.js");

const getUnitsSold = async function(req, res, next){
    try{
        var calculateUnitsSoldResult = await calculateUnitsSold(req.body.orderItemId);
        console.log(calculateUnitsSoldResult);
    }catch(error){
        console.log(error);
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
        res.send({ ok: false, message: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
    
    }
}

module.exports = getUnitsSold;