// File purpose get cartItem check if availability is true
const  mongoose  = require("mongoose");

const retrieveProducts=require("../../products/functions/retrieveProducts.js");

// check availability,set to show, quantity is greater than the cust quantity
async function checkProductAvailability(cartItem) {
  
  try {
    if (typeof cartItem !== "undefined") {
      var retrieveProductsResult= await retrieveProducts({
        //search
        _id: cartItem.product_id
      },{
        //projection
        available:1,
        showProduct:1,
        options:1
      })
      if (retrieveProductsResult.ok === true){
        if (retrieveProductsResult.data[0].available === true && 
              retrieveProductsResult.data[0].showProduct === true)
              {
                var productOptions=retrieveProductsResult.data[0].options;
                var checkingAvailableQuantityResult=await checkingAvailableQuantity(productOptions, cartItem)
                if (checkingAvailableQuantityResult.ok ==true){
                  cartItem.available=true;
                  return {ok: true, data: cartItem}; 
                }else{
                  cartItem.available=false;
                  return {ok: true, data: cartItem}; 
                }

              } else{
                cartItem.available= false;
                //product is checked for availablity but availability is false
                return {ok: true, data: cartItem}; 
              }
      }
      else{
        return {ok: false, message: "Failed to determined product availability" };
      }
    }
    else{
      return {ok: false, message: "CartItem undefined" };
    }
  }catch{
    return {ok: false, message: "internal Server Error" };
  }
}

module.exports = retrieveProductById;

function checkingAvailableQuantity (productOptions, cartItem){
// match the options user selected and the actual product options
//  var corresponding option determines if option is found
    
    try{

      var option={}
      var variant={}
      var variantFound= false;
      var optionFound=false;
    productOptions.forEach((singleOption)=>{
      if (singleOption.color === cartItem.option.color){
          optionFound=true;
          option=singleOption;
      }     
      if (optionFound){
        option.variants.forEach((singleVariant)=>{
          if(singleVariant.size === cartItem.option.size){
            variantFound= true;
            variant=singleVariant;
          }
        })
      } else {
        return {ok: false, message: "Option not Found" };
      }
      // check quantity
      if (variantFound){
        if(variant.quantity >= cartItem.quantity){
          return {ok: true, message:"Quantity available" };
        }
        else{
          return {ok: false, message: "Option not Found" };
        }
      }
      else{
        return {ok: false, message: "variant not Found" };
      }
    })
  }
  catch{
    return {ok: false, message: "Failed unexpectedly" };
  }
}























// const retrieveProducts = require("../../products/functions/retrieveProducts.js");
// var retrieveProductsResult = await retrieveProducts(
    //     { _id: productId },
    //     projection
    // );

    // send to the retrieveProduct file to query find 
  // if product is available with the projection query

  // return Product.find({product_id: productId}, projection)
  //   .then((docs) => {
  //     if (docs.length !== 0) {
  //       return { ok: true, data: docs };
  //     } else {
  //       return { ok: false, data: docs, message: "Product not available" };
  //     }
  //   })
  //   .catch((error) => {
  //     if (
  //       error.path === "_id" &&
  //       error instanceof mongoose.CastError &&
  //       error.kind === "ObjectId"
  //     ) {
  //       return { ok: false, message: "Invalid Product Id" };
  //     } else {
  //       return { ok: false, message: "Error When Getting Products" };
  //     }
  //   });