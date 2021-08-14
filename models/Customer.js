const mongoose = require("mongoose");
const ShoppingCartItem = require("./ShoppingCartItem");

const Schema = mongoose.Schema;
const ShoppingCartItem=require("./ShoppingCartItem.js");

const CustomerSchema = new Schema({
  userId: { type: String, unique: true },
  email: String,
  firstName: String,
  lastName: String,
  mobileNumber: String,
  displayName: String,
  isAnonymous: Boolean,
  cart: [ShoppingCartItem]
  // shippingAddresses: [shippingAddress],
  // wishlist: [String],
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
