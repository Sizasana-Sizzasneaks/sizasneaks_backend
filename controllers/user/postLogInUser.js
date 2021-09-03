var { STATUS_CODE } = require("../constants/httpConstants.js");
const retrieveUserDetails = require("./functions/retrieveUserDetails.js");
var { successfulLogIn } = require("../../services/emailing/emailing.js");

const postLogInUser = async function (req, res) {
  console.log("Post Log In Controller");

  try {
    // check if its a customer
    if (req.body.credential === "customer") {
      //pass parameters used to search what user details to
      //return back matching the projection
      var retrieveUserDetailsResult = await retrieveUserDetails(
        req.body.userId,
        {
          _id: 0,
          email: 1,
        }
      );

      // if user details found send back else send error message
      if (retrieveUserDetailsResult.ok === true) {
        //Send Log In Notification Email
        successfulLogIn(retrieveUserDetailsResult.data.email);

        res.statusCode = STATUS_CODE.SUCCESS;
        res.send({ ok: true, message: "Successful User Log In" });
      } else {
        res.status = STATUS_CODE.BAD_REQUEST;
        res.send(retrieveUserDetailsResult);
      }
    } // to reduce errors and mistake if credentials is not customer unknown user has no access to database
    else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        error: "Access Denied",
      });
    }
  } catch (error) {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({
      ok: false,
      error: "Unknown Server Error - (Weird Get User Situation)",
    });
  }
};

module.exports = postLogInUser;
