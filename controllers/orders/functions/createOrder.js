const Order = require("../../../models/Order.js");

async function createOrder(order){
  if (typeof order !== "undefined" ) {
    //creating a new object based on the order item schema
    var order = new Order(order);
    
    return order
    .save() //Saves this new order object to persistent storage
    .then(() => {
      //Returns a successful object and message when the review has been saved as a document in the collection.
      return { ok: true, message: "Order Created" };
    })
    .catch(() => {
      //Returns unsuccessful object and message when saving of a new product review fails.
      return { ok: false, message: "Failed to create new order" };
    });
  } else {
    return { ok: false, message: "Order is undefined" }; //Returns unsuccessful object and message when order argument is not defined.
  
  }
    
}

module.exports = createOrder;