const shoppingCartItem = {
  //The product ID of the product the shopping cart item is associated with.
  product_id: String,
  //The quantity of the cart item that the customer has in their shopping cart.
  quantity: Number,
  // Details of the product option that the customer wants.
  option: {
    //The color of the product option.
    color: String,
    //The size variant of the product option.
    size: Number,
  },
};

module.exports = shoppingCartItem;
