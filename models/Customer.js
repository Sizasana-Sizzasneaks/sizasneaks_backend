const mongoose = require("mongoose");
const ShoppingCartItem = require("./ShoppingCartItem.js");
const shippingAddress= require("./ShippingAdr.js");

const Schema = mongoose.Schema; //Building a Mongoose Schema Object

const CustomerSchema = new Schema({
  //User ID field, must be unique within the collection and must be of type String.
  userId: { type: String, unique: true },
  //The administrators email address of type String.
  email: String,
  //The customers first name of type String.
  firstName: String,
  //The customers last name of type String.
  lastName: String,
  //The customers mobile number of type String.
  mobileNumber: String,
  //The customers display name of type String, built out of the customers first and last name.
  displayName: String,
  //An indicator of whether or not a customer is an anonymous user.
  isAnonymous: Boolean,
  //This is an array of shopping cart items that represent a users shopping cart.
  cart: [ShoppingCartItem],
   shippingAddresses: [shippingAddress],
  // wishlist: [String],
});

//Building a Model object from the Mongoose Schema Object.
const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
