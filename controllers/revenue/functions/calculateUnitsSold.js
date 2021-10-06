const retrieveOrderItem = require("../../orders/functions/retrieveOrderItem.js");
const OrderItem = require("../../../models/OrderItem.js");

const date = new Date();
async function calculateUnitsSold(orderItemId){

    //- Check is Admin
    //- Get all Order Items - (for the past 6 Month - Including Current Month & not cancelled)
	    //- Determine current month and subtract 5 from it to get Starting Month
		
		// Formating the date and time
		// by using date.format() method
		//(works)
		var currentMonth = date.getMonth() + 1;//(works)
		console.log(currentMonth);//(works)

		var startMonth = currentMonth - 5;//(works)
		console.log(startMonth);//(works)

		

		//(works)
		var retrieveOrderItemResult = await retrieveOrderItem({_id:orderItemId}, {quantity:1, createdAt:1});
		
		console.log (retrieveOrderItemResult);
		//var orderItem = {_id: orderItemId};
		//var monthOrderPlaced = date.getDate(retrieveOrderItemResult); //not getting correct
		//console.log (monthOrderPlaced);
		console.log("Below should be the created at Date");
		/* return OrderItem.find({created_at: {
			$gte: ISODate("2010-04-29T00:00:00.000Z"),
			$lt: ISODate("2010-05-01T00:00:00.000Z")
		}}); */
	
		//var month = currentDate.getMonth();

	
			


	    //- Get Order items from beginning of start month till Now.
    //- Run Loop - Helper Function 
	    //- Make Array With Groups - [{month:5, quantity:0},{month:6, quantity:0},...]
	    //- (Loop) Take One Item - Check Month of timestamp, Then increment quantity with item quantity.
	    //- Return [{month:5, quantity:0},{month:6, quantity:0},...]

}

module.exports = calculateUnitsSold;