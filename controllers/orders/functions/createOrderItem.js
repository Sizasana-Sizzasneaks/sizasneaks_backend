const OrderItem = require("../../../models/OrderItem.js");

async function createOrderItem(orderItem){
  if (typeof orderItem !== "undefined") {
     //creating a new object based on the order item schema
     var orderItem = new OrderItem(orderItem);
    
    return orderItem
    .save() //Saves this new order item object to persistent storage.
    .then(() => {
      //Returns a successful object and message when the order item has been saved as a document in the collection.
      return { ok: true, message: "Order Item  Created" };
    })
    .catch(() => {
      //Returns unsuccessful object and message when saving of a new order item fails.
      return { ok: false, message: "Failed to create new order item" };
    });
  } else {
    return { ok: false, message: "Order Item is undefined" }; //Returns unsuccessful object and message when order item argument is not defined.
  
  }
   
}

module.exports = createOrderItem;