
const checkProductAvailability=require("./functions/checkProductAvailability.js");
const retrieveProducts=require("../../products/functions/retrieveProducts.js");

// function receives a cart array
async function prepareCartData(cart){
    try {
        if (typeof cart !== "undefined") {
            var newCart=[]

            // Check Cartitems availability
            cart.forEach((cartItem)=>{
               var checkProductAvailabilityResult= await checkProductAvailability(cartItem)
               if(checkProductAvailabilityResult.ok === true){
                    newCart.push(checkProductAvailabilityResult.data)
               }else{
                return {ok: false, message: " Failed to check CartItem" };
               }
            }) 

            // Supply additional cart data
            newCart.forEach((cartItem)=>{
                var retrieveProductsResult= await retrieveProducts({_id: cartItem.product_id},{
                    productName:1,
                    sellingPrice:1,
                    imgURls:1
                })
                if(retrieveProductsResult.ok === true){
                    //product retrieved
                    cartItem.productName=retrieveProductsResult.data[0].productName
                    cartItem.sellingPrice=retrieveProductsResult.data[0].sellingPrice
                    cartItem.imgURls=retrieveProductsResult.data[0].imgURls[0]

                }else{
                    return {ok: false, message: " Failed to check CartItem" };
                }
            })
        }
        else{
            return {ok: false, message: "Cart undefined" };
        }
    }catch{
        return { ok: false, message: " internal Server Error" };
    }
}
module.exports = prepareCartData