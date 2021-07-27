const mongoose = require("mongoose");

const ProductOption = require("./ProductOption.js");

// Product  Schema
const Product = mongoose.model("Product", {
  id: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  options: {
    type: [ProductOption],
  },
  imagURLs: {
    type: [String],
  },
  showProduct: {
    type: Boolean,
    required: true,
  },
  supplierTaxAmount: {
    type: Number,
    required: true,
  },
  supplierCost: {
    type: Number,
    required: true,
  },
  sellingPriceTaxAmount: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  applicableTax: {
    type: [String],
    required: true,
  },
});

module.exports = { Product };
