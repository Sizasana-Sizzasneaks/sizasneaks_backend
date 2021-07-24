const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    userId: String,
    email: String,
    firstName: String,
    lastName: String,
    // shippingAddresses: [shippingAddress],
    // wishlist: [String],
    // cart: [ShoppingCartItem],
  

});


const CustomerModel = mongoose.model('Customer', CustomerSchema);

module.exports =  CustomerModel;
