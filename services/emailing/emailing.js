const sendGridMail = require("@sendgrid/mail");

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

module.exports = { successfulSignUp };
