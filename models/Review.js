const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({

  customer_id: {
    type: String,
    required: true,
  },
  customerFullName: {
    type: String,
    required: true,
  },
  product_Id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;
