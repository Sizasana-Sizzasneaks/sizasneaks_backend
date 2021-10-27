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

async function generateTopProductsRevenue(orderItems, sixMonthMark) {
  try {
    let orderItemObjects = {};
    for (let i = sixMonthMark; i <= sixMonthMark + 5; i++) {
      orderItemObjects[monthNames[i]] = {
        month: i,
        quantity: 0,
        revenue: 0,
        profit: 0,
      };
    }
    console.log(orderItemObjects);

    for (var item of orderItems) {
        var revenue =   item.quantity * item.sellingPriceAmount
        var profit = (((item.sellingPriceAmount - item.totalSupplierCost) *0.85)*item.quantity)
      if (
        typeof orderItemObjects[monthNames[item.createdAt.getMonth()]] !==
          "undefined" &&
        typeof orderItemObjects[monthNames[item.createdAt.getMonth()]]
          .quantity !== "undefined"
      ) {
        orderItemObjects[monthNames[item.createdAt.getMonth()]].quantity +=
          item.quantity;
        orderItemObjects[monthNames[item.createdAt.getMonth()]].revenue +=
        revenue,        
        orderItemObjects[monthNames[item.createdAt.getMonth()]].profit +=
        profit
      } else {
        orderItemObjects[monthNames[item.createdAt.getMonth()]] = {
          month: item.createdAt.getMonth(),
          quantity: item.quantity,
          revenue:revenue ,
          profit:profit
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

module.exports = generateTopProductsRevenue;
