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
    
    let orderItemObjects = {};
    for (let i = sixMonthMark; i <= (sixMonthMark + 5); i++) {
      orderItemObjects[monthNames[i]] = { month: i, quantity: 0 };
	  console.log("I happened");
    }
	console.log(orderItemObjects);

    for (var item of orderItems) {
      if (
        typeof orderItemObjects[monthNames[item.createdAt.getMonth()]] !==
          "undefined" &&
        typeof orderItemObjects[monthNames[item.createdAt.getMonth()]]
          .quantity !== "undefined"
      ) {
        orderItemObjects[monthNames[item.createdAt.getMonth()]].quantity +=
          item.quantity;
        
      } else {
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



function updateUnitArrayItem(month, quantity, unitsArray) {
  for (element of unitsArray) {
    if (element.month === month) {
      element.quantity = element.quantity + quantity;
    }
  }
  return unitsArray;
}

module.exports = generateUnitsSold;
