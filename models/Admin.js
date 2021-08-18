const mongoose = require("mongoose");

const Schema = mongoose.Schema; //Building a Mongoose Schema Object

const AdminSchema = new Schema({
  //User ID field, must be unique within the collection and must be of type String.
  userId: { type: String, unique: true },
  //The administrators email address of type String.
  email: String,
});

//Building a Model object from the Mongoose Schema Object.
const AdminModel = mongoose.model("administrator", AdminSchema);

module.exports = AdminModel;
