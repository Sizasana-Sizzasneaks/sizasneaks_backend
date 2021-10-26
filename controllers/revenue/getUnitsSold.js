// Constants
var { STATUS_CODE } = require("../constants/httpConstants.js");
var { USER_CREDENTIAL } = require("../constants/userType.js");

//Helper Functions
const retrieveOrderItem = require("../orders/functions/retrieveOrderItem.js");
const generateUnitsSold = require("./functions/generateUnitsSold.js");





const getUnitsSold = async function(req, res){
    try{
       
        if (req.body.credential === USER_CREDENTIAL.ADMINISTRATOR) {
                    //create search object and add not cancelled
                var search = {orderItemCancelled: false};

                
                //currentMonth.setMonth(currentMonth.getMonth());
                //Get 6 months ago date 
                var sixMonthMark = new Date();
                sixMonthMark.setMonth(sixMonthMark.getMonth() - 4);
                sixMonthMark.setDate(0);
                console.log(sixMonthMark);

                // Add Date search criteria to Search Object
                search ={
                    ...search,
                    createdAt:{
                        $gte: sixMonthMark,
                        $lt: new Date()
                    }
                };

                console.log(search);
                //Get Order Items
                var retrieveOrderItemResult = await retrieveOrderItem(search, {});

                

                if(retrieveOrderItemResult.ok){
                    var generateUnitsSoldResult = await generateUnitsSold(retrieveOrderItemResult.data, sixMonthMark.getMonth());
                    if(generateUnitsSoldResult.ok){
                        res.status = STATUS_CODE.SUCCESS;
                        res.send(generateUnitsSoldResult);
                    }else{
                        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                        res.send(generateUnitsSoldResult);
                    }
                }else{
                    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                    res.send(retrieveOrderItemResult);
                }

        }else{
            //Sending back a unauthorized response when the user is not of type customer.
            res.status = STATUS_CODE.UNAUTHORIZED;
            res.send({
                ok: false,
                message: "Access Denied: Insufficient Credentials",
            });
        }

		
      
    }catch(error){
        console.log(error);
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
        res.send({ ok: false, message: "Unknown Server Error" }); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
    
    }
}

module.exports = getUnitsSold;