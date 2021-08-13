const sendGridMail = require("@sendgrid/mail");

var { prepareReviewReplyEmailContent } = require("./prepareEmailContent.js");

const successfulSignUp = (email) => {
  console.log("SuccesfullSignUp Called");

  sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: { email: email }, // Change to your recipient
    from: { email: "sizasanateam@gmail.com", name: "Sizzasneaks" }, // Change to your verified sender
    templateId: "d-ffba80286cb04f75becb9b0002306753",
    dynamicTemplateData: {
      message:
        "Your account signup was successful. Welcome to the Sizzasneaks family, we hope you have a pleasant experience while shopping with us.",
    },
  };

  return sendGridMail
    .send(msg)
    .then(() => {
      return { ok: true };
    })
    .catch((error) => {
      return { ok: false, error: error };
    });
};

const reviewReplyEmail = async (emailContent) => {
  var prepareEmailContentResult = await prepareReviewReplyEmailContent(
    emailContent
  );

  if (prepareEmailContentResult.ok === true) {
    newEmailContent = prepareEmailContentResult.data;
    // console.log(prepareEmailContentResult.data.review.newReplies);
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: { email: emailContent.email }, // Change to your recipient
      from: { email: "sizasanateam@gmail.com", name: "Sizzasneaks" }, // Change to your verified sender
      templateId: "d-a3cc4d5c2cfe4bda9675c6a3b6862209",
      dynamicTemplateData: {
        productBrand: newEmailContent.product.productBrand,
        productName: newEmailContent.product.productName,
        productImg: newEmailContent.product.imgURls[0],
        reviewScore: newEmailContent.review.rating,
        reviewBody: newEmailContent.review.body,
        replies: newEmailContent.review.newReplies,
      },
    };

    return sendGridMail
      .send(msg)
      .then(() => {
        return { ok: true };
      })
      .catch((error) => {
        return { ok: false, error: error };
      });

    // return { ok: true };
  } else {
    return prepareEmailContentResult;
  }

  console.log("Review Reply Called");
};

module.exports = { successfulSignUp, reviewReplyEmail };
