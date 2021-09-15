const mongoose = require("mongoose");
const OrderItem = require("../../../models/OrderItem.js");

async function createOrderItem(){
    //creating a new object based on the order item schema
    var orderItem1 = new OrderItem({
        productId: "613d131973ee757c8c9a3520",
        option: {
          //The color of the product option.
          color: "Pink",
          //The size variant of the product option.
          size: 10
        },
        quantity: 2,
        totalSupplierCost: 799.99,
        supplierTaxAmount: 120,
        sellingTaxAmount: 577.35,
        sellingPriceAmount: 3849,
        orderItemCancelled: false
      });
      
      return orderItem1.save().then(() => {
        //Returns a successful object and message when the review has been saved as a document in the collection.
        return { ok: true, message: "Order Item  Created" };
      }).catch(() => {
        //Returns unsuccessful object and message when saving of a new product review fails.
        return { ok: false, message: "Failed to create new order item" };
      });
}

module.exports = createOrderItem;