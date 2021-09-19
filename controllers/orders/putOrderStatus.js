var { STATUS_CODE } = require("../constants/httpConstants.js");
const updateOrderStatus = require("./functions/updateOrder.js");

const putOrderStatus = async function(req, res, next){
    try {
        console.log("Put Order status");
        
        var updateOrderStatusResult = await updateOrderStatus(
            req.params.orderId,
            req.body.statusData
          );
          console.log(updateOrderStatusResult);
        //Checks if product update executed successfully.
        if (updateOrderStatusResult.ok === true) {
            res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
            res.send(updateOrderStatusResult); //Sends Success Object.
          } else {
            res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
            res.send(updateOrderStatusResult); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
          }

    } catch (error) {
        

        console.log(error);
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
        res.send({ ok: false, message: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
  
    }
}

module.exports = putOrderStatus;
