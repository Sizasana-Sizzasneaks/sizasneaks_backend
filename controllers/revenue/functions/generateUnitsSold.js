const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function generateUnitsSold(orderItems, sixMonthMark) {
  try {
    //creating collection of objects to hold groups of month and quantity from order items collection
    let orderItemObjects = {};

    //loop through order item objects collection created to set month names, indexes and quantities
    for (let i = sixMonthMark; i <= (sixMonthMark + 5); i++) {
      orderItemObjects[monthNames[i]] = { month: i, quantity: 0 };
	  
    }
	console.log(orderItemObjects);

    //loops through order items collection for month created  and quantity values
    for (var item of orderItems) {
      //checks whether month and quantity have been defined
      if (
        typeof orderItemObjects[monthNames[item.createdAt.getMonth()]] !==
          "undefined" &&
        typeof orderItemObjects[monthNames[item.createdAt.getMonth()]]
          .quantity !== "undefined"
      ) {
        //assigns month names to month values and increases the initial quantity value based on the values in the order item collection 
        //saves assigned values to collection of order item objects
        orderItemObjects[monthNames[item.createdAt.getMonth()]].quantity +=
          item.quantity;
        
      } else {
        //returns order item object collection  if month and quantity values are not defined
        orderItemObjects[monthNames[item.createdAt.getMonth()]] = {
          month: item.createdAt.getMonth(),
          quantity: item.quantity,
        };
      }
    }

    return {
      ok: true,
      data: orderItemObjects,
    };
  } catch (error) {
    console.log("Error: Generate Units Sold");
    console.log(error);
    return {
      ok: false,
      message: "Unexpected error when generating Units Sold.",
    };
  }
}



module.exports = generateUnitsSold;
