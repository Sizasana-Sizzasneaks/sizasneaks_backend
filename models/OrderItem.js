const orderItem = {
    _id: String,
    
    productId: String,

    option: {
        //The color of the product option.
        color: String,
        //The size variant of the product option.
        size: Number,
      },
    
    saleDateTime: { createdAt: "createdAt" },

    supplierTaxAmount: Number,

    orderItemCost: Number,
    
    orderItemTaxAmount: Number,
    
    orderItemPrice: Number
};

module.exports = orderItem;
