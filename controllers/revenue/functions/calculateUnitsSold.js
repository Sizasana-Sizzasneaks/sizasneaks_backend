const retrieveOrderItem = require("../../orders/functions/retrieveOrderItem.js");
const OrderItem = require("../../../models/OrderItem.js");

async function calculateUnitsSold(orderItemId){

    //- Check is Admin
    //- Get all Order Items - (for the past 6 Month - Including Current Month & not cancelled)
	    //- Determine current month and subtract 5 from it to get Starting Month
		
		// Formating the date and time
		// by using date.format() method
		var currentDate = new Date();//(works)
		var currentMonth = currentDate.getMonth();//(works)
		console.log(currentMonth);//(works)

		var startMonth = currentMonth - 5;//(works)
		console.log(startMonth);//(works)

		//(works)
		var retrieveOrderItemResult = await retrieveOrderItem({_id:orderItemId}, {quantity:1, createdAt:1});
		
		console.log (retrieveOrderItemResult);

		return OrderItem.find({"createdAt":{$month:9}});
	
		//var month = currentDate.getMonth();

		


	    //- Get Order items from beginning of start month till Now.
    //- Run Loop - Helper Function 
	    //- Make Array With Groups - [{month:5, quantity:0},{month:6, quantity:0},...]
	    //- (Loop) Take One Item - Check Month of timestamp, Then increment quantity with item quantity.
	    //- Return [{month:5, quantity:0},{month:6, quantity:0},...]

}

module.exports = calculateUnitsSold;