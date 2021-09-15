const mongoose = require("mongoose");
const Order = require("../../../models/Order.js");

async function createOrder(){
    //creating a new object based on the order item schema
    var order = new Order({
        customer_id: "hbb413mjXDYfU4VAF4MdCIW6egw1",
        orderItems: ["6141b10d801bda2e4c090484"],
        shippingCost: 50,
        paymentComplete: true,
        paymentTime:"2021-05-21",
        hasShipped: false,
        hasBeenDelivered: false,
        deliveredTime: "2021-05-25",
      });
      
      return order.save().then(() => {
        //Returns a successful object and message when the review has been saved as a document in the collection.
        return { ok: true, message: "Order Created" };
      }).catch(() => {
        //Returns unsuccessful object and message when saving of a new product review fails.
        return { ok: false, message: "Failed to create new order" };
      });
}

module.exports = createOrder;