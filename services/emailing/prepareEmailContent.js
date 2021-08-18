
const prepareReviewReplyEmailContent = async (emailContent) => {
  try {
    var replies = []; //Creating a variable to hold the email replies that are part of the email content.

    //Looping through each email reply
    emailContent.review.replies.forEach((reply) => {
      //Capturing the body of each email reply (text).
      var newReply = { body: reply.body };
      //Converting a timestamp into a date object.
      var dateTime = new Date(reply.createdAt);
      //Getting a date String from the data object.
      newReply["dateTime"] = dateTime.toLocaleString();
      //Adding the updated body and date time string to the new replies array.
      replies.push(newReply);
    });

    //After preparing each reply, the new replies array is added to the email content.
    emailContent.review.newReplies = replies;

    return { ok: true, data: emailContent }; //Returning Successfully with the prepared email content.
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Failed to prepare email content." }; //Returning when an unexpected error is thrown during execution of this function.
  }
};

module.exports = { prepareReviewReplyEmailContent };
