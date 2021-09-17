const createOrderItem = require("./functions/createOrderItem.js");

const postOrderItem = async function(req, res){
    console.log("Create Order Item Controller");
    try {
        var createOrderItemResult = await createOrderItem(req.body);

        if (createOrderItemResult.ok === true) {
            res.status = STATUS_CODE.SUCCESS; // Attach Success Status Code to Response
            res.send(createOrderItemResult); //Send back an object that contains the corresponding success object.
          } else {
            res.status = STATUS_CODE.BAD_REQUEST; //Attach Bad Request Status code to response object.
            res.send(createOrderItemResult); //Sending back the corresponding failure object.
          }
    } catch (error) {
        console.log(error);
        // Sending a response when an unknown error occurs during execution.
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; // Attaching an Internal Server Error Status code to the response object.
        res.send({ ok: false, message: "Unknown Server Error" });
    }
};

module.exports = postOrderItem;