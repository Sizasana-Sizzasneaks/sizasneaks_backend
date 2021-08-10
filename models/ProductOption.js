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
  color: {
    type: String,
    required: true,
  },
  variants: {
    type: [variant],
    required: true,
  },
};

module.exports = productOption;
