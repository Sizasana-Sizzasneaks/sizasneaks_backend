var nodemailer = require("nodemailer");

async function setUpTransporter() {
  var testAccount = await nodemailer.createTestAccount();

  // Set Up Nodemailer Transporter with Mailing Account Credentials
  var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    // service: "hotmail",
    port: 587,
    secureConnection: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
    tls:{
        secureProtocol: "TLSv1_method"
    }
  });


  return transporter;
}

module.exports = setUpTransporter;
