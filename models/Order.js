const mongoose = require("mongoose");
const OrderItem = require("./OrderItem.js");

const Schema = mongoose.Schema; //Building a Mongoose Schema Object

const OrderSchema = new Schema({

  _id: { type: String, unique: true },
 
  customer_id: String,
  //shippingAddress:shippingAddress,
  items:{type: [OrderItem]},

  dateTime: { createdAt: "createdAt" },

  shippingCost: Number,
  
  totalPaid: Number,
  
  totalTax: Number,
  
  status: String
 
});

//Building a Model object from the Mongoose Schema Object.
const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
