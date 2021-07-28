const mongoose = require("mongoose");
const ProductOption = require("./ProductOption.js");

const Schema = mongoose.Schema;

// Product  Schema
const ProductSchema = new Schema({
  
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  categories: {
    type: [String]
  },
  options: {
    type: [ProductOption]
  },
  imagURLs: {
    type: [String]
  },
  showProduct: {
    type: Boolean,
    required: true
  },
  supplierTaxAmount: {
    type: Number,
    required: true
  },
  supplierCost: {
    type: Number,
    required: true
  },
  sellingPriceTaxAmount: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  applicableTax: {
    type: [String],
    required: true
  },

  available: {
    type: Boolean,
    required: true
  }
});

const ProductModel = mongoose.model("products", ProductSchema)

module.exports = ProductModel;
