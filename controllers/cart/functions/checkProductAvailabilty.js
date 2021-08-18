// File purpose get cartItem check if availability is true
const mongoose = require("mongoose");
const retrieveProducts = require("../../products/functions/retrieveProducts.js");

async function checkProductAvailability(cartItem) {
  try {
    // check cartItem is not undefined
    if (typeof cartItem !== "undefined") {
      // replacing the cartItem object into a new placeholder  
      var newCartItem = { ...cartItem._doc };

      // get products details
      var retrieveProductsResult = await retrieveProducts(
        {
          //search
          _id: cartItem.product_id,
        },
        {
          //projection
          available: 1,
          showProduct: 1,
          options: 1,
        }
      );

      if (retrieveProductsResult.ok === true) {
        //if product is retrieved successful check the value 
        //in the available and showProduct
        if (
          retrieveProductsResult.data[0].available === true &&
          retrieveProductsResult.data[0].showProduct === true

          // if product is available and admin sets visibility to true 
          // check the quantity of products incase the product is not in the inventory
        ) {
          var productOptions = retrieveProductsResult.data[0].options;
          var checkingAvailableQuantityResult = await checkingAvailableQuantity(
            productOptions,
            newCartItem
          );
        
          if (checkingAvailableQuantityResult.ok === true) {
            newCartItem.available = true;
            return {
              ok: true,
              data: newCartItem,
              message: "Availability is true",
            };
          } else {
            newCartItem.available = false;
            return {
              ok: true,
              data: newCartItem,
              message: "Availability is Not True -All",
            };
          }
        } else {
          newCartItem.available = false;
          //product is checked for availability but availability is false
          return {
            ok: true,
            data: newCartItem,
            message: "Availability is Not True -Show, Avail",
          };
        }
      } else {
        return {
          ok: false,
          message: "Failed to determined product availability",
        };
      }
    } else {
      return { ok: false, message: "CartItem undefined" };
    }
  } catch {
    return { ok: false, message: "internal Server Error" };
  }
}

module.exports = checkProductAvailability;

function checkingAvailableQuantity(productOptions, cartItem) {
  // match the options user selected and the actual product options
  // var corresponding option determines if option is found

  try {
    var option = {};
    var variant = {};
    var variantFound = false;
    var optionFound = false;

    // loop through the products available options 
    // check models\ProductOption.js for the structure
    for (var i = 0; i < productOptions.length; i++) {
      if (productOptions[i].color === cartItem.option.color) {
        optionFound = true;
        option = productOptions[i];
      }
    }

    // color acts as key in the product options object
    // if color is found check variants  
    if (optionFound) {
      for (var x = 0; x < option.variants.length; x++) {
        if (option.variants[x].size === cartItem.option.size) {
          variantFound = true;
          variant = option.variants[x];
        }
      }
    } else {
      return { ok: false, message: "Option not Found" };
    }

    // check quantity
    if (variantFound) {
      if (variant.quantity >= cartItem.quantity) {
        return { ok: true, message: "Quantity available" };
      } else {
        return { ok: false, message: "Option not Found" };
      }
    } else {
      return { ok: false, message: "variant not Found" };
    }
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Failed unexpectedly" };
  }
}
 