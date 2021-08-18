const sendGridMail = require("@sendgrid/mail");

var { prepareReviewReplyEmailContent } = require("./prepareEmailContent.js");

const successfulSignUp = (email) => {
  try {
    //Setting up SendGrid package with the platform API Key.
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

    //Constructing a message component with the details of the message.
    const msg = {
      to: { email: email }, //Receivers email address.
      from: { email: "sizasanateam@gmail.com", name: "Sizzasneaks" }, //Senders email address.
      templateId: "d-ffba80286cb04f75becb9b0002306753", //Specifying the template to be used.
      //Adding dynamic data that will fill be presented within the corresponding email message.
      dynamicTemplateData: {
        message:
          "Your account signup was successful. Welcome to the Sizzasneaks family, we hope you have a pleasant experience while shopping with us.",
      },
    };
    //Sending The email message using the the SendGrid package.
    return sendGridMail
      .send(msg)
      .then(() => {
        return { ok: true }; //Returning in the event that the email is sent successfully.
      })
      .catch((error) => {
        return { ok: false, message: error }; //Returning in the event that the email is not successfully sent.
      });
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Unknown Server Error" }; //Returning when an unexpected error is thrown.
  }
};

const reviewReplyEmail = async (emailContent) => {
  //Preparing the email content received before sending it via email.
  var prepareEmailContentResult = await prepareReviewReplyEmailContent(
    emailContent
  );

  //Checking if the preparing of email content happened successfully.

  if (prepareEmailContentResult.ok === true) {
    //if email content is prepared successfully it is used to send the email.
    newEmailContent = prepareEmailContentResult.data;

    //Setting up SendGrid package with the platform API Key.
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

    //Constructing a message component with the details of the message.
    const msg = {
      to: { email: emailContent.email }, //Receivers email address.
      from: { email: "sizasanateam@gmail.com", name: "Sizzasneaks" }, //Senders email address.
      templateId: "d-a3cc4d5c2cfe4bda9675c6a3b6862209", //Specifying the template to be used.
      //Adding dynamic data that will fill be presented within the corresponding email message.
      dynamicTemplateData: {
        productBrand: newEmailContent.product.productBrand,
        productName: newEmailContent.product.productName,
        productImg: newEmailContent.product.imgURls[0],
        reviewScore: newEmailContent.review.rating,
        reviewBody: newEmailContent.review.body,
        replies: newEmailContent.review.newReplies,
      },
    };
    //Sending The email message using the the SendGrid package.
    return sendGridMail
      .send(msg)
      .then(() => {
        //Returning in the event that the email is sent successfully.
        return { ok: true };
      })
      .catch((error) => {
        return { ok: false, message: error }; //Returning in the event that the email is not successfully sent.
      });
  } else {
    return prepareEmailContentResult; //Returning When the preparing of email content does not execute successfully.
  }
};

module.exports = { successfulSignUp, reviewReplyEmail };
