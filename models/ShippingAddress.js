const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShippingAddressSchema = new Schema(
  {
    addressLineOne: {
      type: String,
      required: true,
    },
    addressLineTwo: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
      },
  },
   
);

const ShippingAddressModel = mongoose.model("ShippingAddress", ShippingAddressSchema);

module.exports = ShippingAddressModel;
