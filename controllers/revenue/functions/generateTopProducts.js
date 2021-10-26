const retrieveProducts = require("../../products/functions/retrieveProducts.js");

async function generateTopProducts(orderItems) {
  try {
    if (typeof orderItems !== "undefined") {
      var outputArray = [];

      //Generating list
      for (var item of orderItems) {
        if (doesItAlreadyExist(item.productId, outputArray)) {
          outputArray = updateArrayItem(
            item.productId,
            item.quantity,
            outputArray
          );
        } else {
          outputArray = [
            ...outputArray,
            { productId: item.productId, quantity: item.quantity },
          ];
        }
      }
      //Put items in descending Order of quantity
      outputArray.sort(function (a, b) {
        return b.quantity - a.quantity;
      });

      // Trim Array to only Top 5
      outputArray = outputArray.slice(0, 5);

      //Get Product Names
      for (var i of outputArray) {
        var retrieveProductsResult = await retrieveProducts(
          { _id: i.productId },
          { productName: 1, _id: 0 }
        );
        if (retrieveProductsResult.ok) {
          i.productName = retrieveProductsResult.data[0].productName;
        } else {
          return { ok: false, message: "Error when getting product data" };
        }
      }

      return { ok: true, data: outputArray };
    } else {
      return {
        ok: false,
        message:
          "orderItems array must be supplied to generateTopProducts function",
      };
    }
  } catch (error) {
    console.log("Error: Generate Top Products");
    console.log(error);
    return {
      ok: false,
      message: "Unexpected error when generating Top Products.",
    };
  }
}

function doesItAlreadyExist(productId, theArray) {
  var output = false;

  for (var element of theArray) {
    if (element.productId === productId) {
      output = true;
    }
  }

  return output;
}

function updateArrayItem(produ, quantity, theArray) {
  for (var element of theArray) {
    if (element.productId === productId) {
      element.quantity = element.quantity + quantity;
    }
  }
  return theArray;
}

module.exports = generateTopProducts;
