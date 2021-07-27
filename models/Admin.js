const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  userId: { type: String, unique: true },
  email: String
});

const AdminModel = mongoose.model("administrator", AdminSchema);

module.exports = AdminModel;
