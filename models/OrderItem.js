const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItem = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    option: {
      //The color of the product option.
      color: {
        type: String,
        required: true,
      },
      //The size variant of the product option.
      size: {
        type: Number,
        required: true,
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalSupplierCost: {
      type: Number,
      required: true,
    },
    supplierTaxAmount: {
      type: Number,
      required: true,
    },
    sellingTaxAmount: {
      type: Number,
      required: true,
    },
    sellingPriceAmount: {
      type: Number,
      required: true,
    },
    orderItemCancelled: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

//Building a Model object from the Mongoose Schema Object.
const OrderItemModel = mongoose.model("OrderItem", orderItem);

module.exports = orderItem;
