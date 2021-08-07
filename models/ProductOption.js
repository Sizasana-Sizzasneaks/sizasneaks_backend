const variant = {
  size: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
};

const productOption = {
  color: String,
  variants: [variant],
};



module.exports = productOption;
