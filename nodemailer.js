
var nodemailer = require('nodemailer');

//Transporter object being used to send the emails
var transporter = nodemailer.createTransport({
 service: 'hotmail',
 auth: {
        user: 'sizasneaks@outlook.com',
        pass: 'Coded-19'
    }
});

//email object 
const mailOptions = {
  from: 'sizasneaks@outlook.com', // sender address
  to: 'kumzstudy@gmail.com', // list of receivers
  subject: 'Sign Up Notification', // Subject line
  text: "Your account signup was successful. Welcome to the Sizzasneaks family, we hope you have a pleasant experience while shopping with us." // plain text body
};


transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});