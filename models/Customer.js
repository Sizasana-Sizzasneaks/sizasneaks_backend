const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  userId: { type: String, unique: true },
  email: String,
  firstName: String,
  lastName: String,
  mobileNumber: String,
  displayName: String,
  isAnonymous: Boolean
  // shippingAddresses: [shippingAddress],
  // wishlist: [String],
  // cart: [ShoppingCartItem],
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
