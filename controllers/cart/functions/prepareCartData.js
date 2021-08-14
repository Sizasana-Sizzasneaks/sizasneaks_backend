const checkProductAvailability = require("./checkProductAvailabilty.js");
const retrieveProducts = require("../../products/functions/retrieveProducts.js");

// function receives a cart array
async function prepareCartData(cart) {
  try {
    if (typeof cart !== "undefined") {
      var newCart = [];

      // Check Cartitems availability
      for (var i = 0; i < cart.length; i++) {
        var checkProductAvailabilityResult = await checkProductAvailability(
          cart[i]
        );
        
        if (checkProductAvailabilityResult.ok === true) {
          newCart.push(checkProductAvailabilityResult.data);
        } else {
          return { ok: false, message: "Failed to check CartItem" };
        }
      }

      ///Worrks

      for (var a = 0; a < newCart.length; a++) {
        var retrieveProductsResult = await retrieveProducts(
          { _id: newCart[a].product_id },
          {
            productName: 1,
            sellingPrice: 1,
            imgURls: 1,
          }
        );

        if (retrieveProductsResult.ok === true) {
          //product retrieved
          newCart[a].productName = retrieveProductsResult.data[0].productName;
          newCart[a].sellingPrice = retrieveProductsResult.data[0].sellingPrice;
          newCart[a].imgURls = retrieveProductsResult.data[0].imgURls[0];

          
        } else {
          return { ok: false, message: " Failed to check CartItem" };
        }
      }

      return { ok: true, data: newCart };

      // Supply additional cart data
    } else {
      return { ok: false, message: "Cart undefined" };
    }
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Internal Server Error" };
  }
}

module.exports = prepareCartData;
