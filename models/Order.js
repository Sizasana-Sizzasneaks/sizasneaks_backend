const mongoose = require("mongoose");
const shippingAddress = require("./ShippingAddress.js");

const Schema = mongoose.Schema; //Building a Mongoose Schema Object

const OrderSchema = new Schema(
  {
    customer_id: {
      type: String,
      required: true,
    },
    shippingAddress: shippingAddress,
    orderItems: { type: [String], required: true },
    shippingCost: {
      type: Number,
      required: true,
    },

    paymentComplete: {
      type: Boolean,
      required: true,
    },
    paymentTime: Date,

    hasShipped: {
      type:Boolean,
      required: true
    },
    shippedTime: Date,

    hasBeenDelivered: {
      type:Boolean,
      required: true
    },
    deliveredTime: Date
  },
  { timestamps: { createdAt: "createdAt" } }
);

//Building a Model object from the Mongoose Schema Object.
const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;
