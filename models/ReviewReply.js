const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewReply = new Schema(
  {
    //This variable holds the reply text specified for the reply.
    body: {
      type: String,
    },
  },
    //Adding a timestamp to store when a review reply is created.
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = ReviewReply;
