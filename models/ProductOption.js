const variant = require("./Variant.js");

const productOption = {
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
};

module.exports = productOption;
