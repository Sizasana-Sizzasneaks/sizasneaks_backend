const updateOrderItem = require("./updateOrderItem.js");
const changeProductOptionQuantity = require("../../products/functions/changeProductOptionQuantity.js");
const {QUANTITY_CHANGE_MODES} = require("../../constants/quantityChangeModes.js");

async function cancelOrderItem(orderItem){
    return new Promise(async (resolve, reject) => {
        try {
            var itemCancelled = false;
            var quantityChanged = false;
          if (
            typeof orderItem !== "undefined" &&
            typeof orderItem._id !== "undefined" &&
            typeof orderItem.productId !== "undefined" &&
            typeof orderItem.option !== "undefined" &&
            typeof orderItem.quantity !== "undefined"
          ) {
            
            var updateOrderItemResult = await updateOrderItem(orderItem._id, {
              orderItemCancelled: true,
            });
            if (updateOrderItemResult.ok) {
                itemCancelled = true;
              var changeProductOptionQuantityResult =
                await changeProductOptionQuantity(
                  orderItem.productId, 
                  orderItem.option.color,
                  orderItem.option.size,
                  orderItem.quantity,
                  QUANTITY_CHANGE_MODES.INCREMENT
                );
    
                if (changeProductOptionQuantityResult.ok) {
                    quantityChanged = true;
                    resolve({ok:true, message:"Order Item cancelled"})
                } else {
                    throw "update quantity of product failed";
                }
            } else {
              reject(updateOrderItemResult);
            }
          } else {
            reject({
              ok: false,
              message: "cancelOrderItem failed: orderItemId not supplied",
            });
          }
        } catch (error) {
    
            if(itemCancelled){
                var reverseUpdateOrderItemResult = await updateOrderItem(orderItem._id, {
                    orderItemCancelled: false,
                  }); 
                if(reverseUpdateOrderItemResult.ok){
                    console.log("updateOrderItem cleaned");
                }else{
                    console.log("updateOrderItem failed clean");
                }
            }
    
            if(quantityChanged){
                var reverseChangeProductOptionQuantityResult =
                await changeProductOptionQuantity(
                  orderItem.productId,
                  orderItem.option.color,
                  orderItem.option.size,
                  orderItem.quantity,
                  QUANTITY_CHANGE_MODES.DECREMENT
                );
                if(reverseChangeProductOptionQuantityResult.ok){
                    console.log("changeProductOptionQuantity cleaned");
                }else{
                    console.log("changeProductOptionQuantity failed clean");
                }
            }
          reject({
            ok: false,
            message: error
          });
        }
      });
    
}
  

module.exports = cancelOrderItem;
