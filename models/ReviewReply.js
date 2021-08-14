const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewReply = new Schema(
  {
    body: {
      type: String,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = ReviewReply;
