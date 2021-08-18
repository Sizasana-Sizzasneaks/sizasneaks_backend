const checkProductAvailability = require("./checkProductAvailabilty.js");
const retrieveProducts = require("../../products/functions/retrieveProducts.js");

async function prepareCartData(cart) {
  try {
    // checks that the argument is not undefined
    if (typeof cart !== "undefined") {
      var newCart = [];

      //loop through each cartItem and check the availability process 
      for (var i = 0; i < cart.length; i++) {
        var checkProductAvailabilityResult = await checkProductAvailability(
          cart[i]
        );
        // if its true append that cartItem meaning the availability process was a success  
        if (checkProductAvailabilityResult.ok === true) {
          newCart.push(checkProductAvailabilityResult.data);
        } else {
          // if an error occurred in the checking process send error code
          return {checkProductAvailabilityResult};
        }
      }

      // Supply additional cart data
      for (var a = 0; a < newCart.length; a++) {
        // using the product id query the database for product details 
        var retrieveProductsResult = await retrieveProducts(
          { _id: newCart[a].product_id },
          {
            productName: 1,
            sellingPrice: 1,
            imgURls: 1,
          }
        );
        // once database returns cartItem and searched according to the filter finds
        // add the retrieved information to the newCart
        if (retrieveProductsResult.ok === true) {
          newCart[a].productName = retrieveProductsResult.data[0].productName;
          newCart[a].sellingPrice = retrieveProductsResult.data[0].sellingPrice;
          newCart[a].imgURls = retrieveProductsResult.data[0].imgURls[0];    
        } 
        else {
          return { retrieveProductsResult };
        }
      }
      //function tasks are executed successful return cart object 
      return { ok: true, data: newCart };

    } else {
      return { ok: false, message: "Cart undefined" };
    }
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Internal Server Error" };
  }
}

module.exports = prepareCartData;
