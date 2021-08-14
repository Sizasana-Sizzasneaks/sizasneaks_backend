// File purpose get cartItem check if availability is true
const mongoose = require("mongoose");

const retrieveProducts = require("../../products/functions/retrieveProducts.js");

// check availability,set to show, quantity is greater than the cust quantity
async function checkProductAvailability(cartItem) {
  try {
    if (typeof cartItem !== "undefined") {
      var newCartItem = { ...cartItem._doc };
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
        if (
          retrieveProductsResult.data[0].available === true &&
          retrieveProductsResult.data[0].showProduct === true
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
              message: "Availiability is true",
            };
          } else {
            newCartItem.available = false;
            return {
              ok: true,
              data: newCartItem,
              message: "Availiability is Not True -All",
            };
          }
        } else {
          newCartItem.checkProductAvailabilityavailable = false;
          //product is checked for availablity but availability is false
          return {
            ok: true,
            data: newCartItem,
            message: "Availiability is Not True -Show, Avail",
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
  //  var corresponding option determines if option is found

  try {
    var option = {};
    var variant = {};
    var variantFound = false;
    var optionFound = false;

    for (var i = 0; i < productOptions.length; i++) {
      if (productOptions[i].color === cartItem.option.color) {
        optionFound = true;
        option = productOptions[i];
      }
    }

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
 