const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewReply = require("./ReviewReply.js");

const ReviewSchema = new Schema(
  {
    customer_id: {
      type: String,
      required: true,
    },
    customerFullName: {
      type: String,
      required: true,
    },
    product_id: {
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

    replies: {
      type: [ReviewReply],
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const ReviewModel = mongoose.model("reviews", ReviewSchema);

module.exports = ReviewModel;
