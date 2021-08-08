const setUpTransporter = require("./index.js");

function successfulSignUp(email) {
  const mailOptions = {
    from: ' "Sizzasneaks 👟"  <'+ process.env.NODEMAILER_TEST_USER +'>', // sender address
    to: email, // list of receivers
    subject: "Succesfull Sign Up", // Subject line
    text: "Your account signup was successful. Welcome to the Sizzasneaks family, we hope you have a pleasant experience while shopping with us.", // plain text body
  };

  //var sendMailResult =
  sendMail(mailOptions);
  // .then(() => {})
  // .catch((error) => {});
}

async function sendMail(mailOptions) {
  var transporter = await setUpTransporter();

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      if (info) {
        console.log("Success - In If");
        console.log(info);
      } else {
        console.log("Success - Else If");
      }
    })
    .catch((error) => {
      if (error) {
        console.log("Error - In If");
        console.log(error);
      } else {
        console.log("Error - Else If");
      }
    });
}

module.exports = successfulSignUp;
