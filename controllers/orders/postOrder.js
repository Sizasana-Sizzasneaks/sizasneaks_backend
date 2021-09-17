const createOrder = require("./functions/createOrder.js");

const postOrder = async function(req, res){
    console.log("Create Order Controller");
    try {
        var createOrderResult = await createOrder(req.body);

        if (createOrderResult.ok === true) {
            res.status = STATUS_CODE.SUCCESS; // Attach Success Status Code to Response
            res.send(createOrderResult); //Send back an object that contains the corresponding success object.
          } else {
            res.status = STATUS_CODE.BAD_REQUEST; //Attach Bad Request Status code to response object.
            res.send(createOrderResult); //Sending back the corresponding failure object.
          }
    } catch (error) {
        console.log(error);
        // Sending a response when an unknown error occurs during execution.
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; // Attaching an Internal Server Error Status code to the response object.
        res.send({ ok: false, message: "Unknown Server Error" });
    }
};

module.exports = postOrder;