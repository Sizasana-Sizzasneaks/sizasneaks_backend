const variant = {
  //Product options contain multiple variants that are different in size.
  //This is the size variable.
  size: {
    type: Number,
    required: true,
  },
  //This is the quantity variable that holds the amount of this specific product variant that is available for purchase.
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
};

module.exports = variant;
