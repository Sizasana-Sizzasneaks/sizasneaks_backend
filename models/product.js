const mongoose = require("mongoose");
const ProductOption = require("./ProductOption.js");

const Schema = mongoose.Schema;

// Product  Schema
const ProductSchema = new Schema(
  {
    //The name of a product of type string, that is required to always be there.
    productName: {
      type: String,
      required: true,
    },
    //The description of a product of type string, that is required to always be there.
    productDescription: {
      type: String,
      required: true,
    },
    //The brand of a product of type string, that is required to always be there.
    brand: {
      type: String,
      required: true,
    },
    //An array Strings that Represent the categories the product belongs to.
    categories: {
      type: [String],
    },
    //An Array of product options that detail the various options of a product.
    options: {
      type: [ProductOption],
    },
    //An array of URLs that point directly to a products image(s).
    imgURls: {
      type: [String],
    },
    //A boolean variable that is used to determine weather or not a product should be viewable to customers.
    showProduct: {
      type: Boolean,
      required: true,
    },
    //The amount of tax paid to the supplier when acquiring the product item.
    supplierTaxAmount: {
      type: Number,
      required: true,
    },
    //The total amount paid to the supplier when acquiring the product item.
    supplierCost: {
      type: Number,
      required: true,
    },
    //The total tax amount of the selling price that is tax.
    sellingPriceTaxAmount: {
      type: Number,
      required: true,
    },
    //The total selling price for a single product item.
    sellingPrice: {
      type: Number,
      required: true,
    },
    //Applicable types of tax on the product item.
    applicableTax: {
      type: [String],
      required: true,
    },
    //Boolean variable that determines if a product is available on the platform.
    available: {
      type: Boolean,
      required: true,
    },
  },
  //Adding a timestamp to store when a product item is created.
  { timestamps: { createdAt: "createdAt" } }
);

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
