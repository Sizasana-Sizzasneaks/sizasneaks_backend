var nodemailer = require("nodemailer");

async function setUpTransporter() {
 // var testAccount = await nodemailer.createTestAccount();

  // Set Up Nodemailer Transporter with Mailing Account Credentials
  var transporter = nodemailer.createTransport({
    host: "imap.ethereal.email",
    // service: "hotmail",
    port: 587,
    secureConnection: false,
    auth: {
      user: process.env.NODEMAILER_TEST_USER,
      pass: process.env.NODEMAILER_TEST_PASSWORD,
    },
   
  });

  return transporter;
}

module.exports = setUpTransporter;
