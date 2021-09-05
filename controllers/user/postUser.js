var admin = require("firebase-admin");


var createNewUser = require("../user/functions/createNewUser.js");
var { successfulSignUp } = require("../../services/emailing/emailing.js");

const postUser = async (req, res) => {
  console.log("Post User Controller");

  // Take User ID and create new User
  try {
    //checks if it is a customer or not
    if (req.body.credential === "customer") {
      var createNewUserResult = await createNewUser(req.body.userId, req.body);

      if (createNewUserResult.ok === true) {
        if (typeof req.body.email !== "undefined") {
          // Sending Successful SigUp Email
          successfulSignUp(req.body.email);
        }

        res.status = STATUS_CODE.SUCCESS;
        res.send({ ok: true });
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send(createNewUserResult);
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        error: "Access Denied",
      });
    }
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unknown Server Error" });
  }
};

module.exports = postUser;
