var { STATUS_CODE } = require("../constants/httpConstants.js");
const cancelOrder = require("./functions/cancelOrder.js");

const putCancelOrder = async function (req, res, next) {
    try {
        if(req.body.orderId !== "undefined" && req.body.cancelDescription !== "undefined"){
            var cancelOrderResult = await cancelOrder(req.body.orderId, req.body.cancelDescription);
            if(cancelOrderResult.ok){
                res.status = STATUS_CODE.SUCCESS;
                res.send({ok: true, message: "Order cancelled successfully"})
            }else{
                res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
                res.send(cancelOrderResult);
            }
        }else{
            res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
            //Sends back object with ok set to false and with a message detailing the reason for execution failure.
            res.send({ ok: false, message: "Insufficient data supplied." });
        }
        
    } catch (error) {
        console.log(error);
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
        res.send({ ok: false, message: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
    }
}

module.exports = putCancelOrder;