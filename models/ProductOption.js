const productOption = {
  color: String,
  size: Number,
  quantity: {
    type: Number,
    min: 0
  },
};

module.exports = productOption;
