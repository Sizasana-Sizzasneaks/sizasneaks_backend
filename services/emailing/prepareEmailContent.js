// Recieves Review Reply Email Content & Reterns Email Content in
// a more human readable format.

const prepareReviewReplyEmailContent = async (emailContent) => {
  try {
    var replies = [];

    emailContent.review.replies.forEach((reply) => {
      var newReply = { body: reply.body };
      var dateTime = new Date(reply.createdAt);
      newReply["dateTime"] = dateTime.toLocaleString();
      replies.push(newReply);
    });

    emailContent.review.newReplies = replies;

    return { ok: true, data: emailContent };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Failed to prepare email content." };
  }
};

module.exports = { prepareReviewReplyEmailContent };
