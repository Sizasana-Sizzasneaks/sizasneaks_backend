const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const variant = require("./Variant.js");

const productOption = new Schema({
  //The color variable of a product option, of type string.
  color: {
    type: String,
    required: true,
  },
  //A variable that is of type variant. Each product option has multiple variants.
  variants: {
    type: [variant],
    required: true,
  },
});

module.exports = productOption;
