const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewReply = require("./ReviewReply.js");

const ReviewSchema = new Schema(
  {
    //This variable holds the id of the customer user  that wrote the review. Type of String and is required.
    customer_id: {
      type: String,
      required: true,
    },
    //The variable that holds the full name of the user that wrote the review. 
    customerFullName: {
      type: String,
      required: true,
    },
    //The product id of the product that the review is associated with.
    product_id: {
      type: String,
      required: true,
    },
    //The rating score for the review, is of type number and is required.
    rating: {
      type: Number,
      required: true,
    },
    //The actual message that the customer wrote for the review. 
    body: {
      type: String,
      required: true,
    },
    //An Array that contains all the replies associated with this review. 
    replies: {
      type: [ReviewReply],
    },
  },
   //Adding a timestamp to store when a review is created.
  { timestamps: { createdAt: "createdAt" } }
);

//Building a Model object from the Mongoose Schema Object.
const ReviewModel = mongoose.model("reviews", ReviewSchema);

module.exports = ReviewModel;
