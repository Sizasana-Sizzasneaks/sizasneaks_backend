var admin = require("firebase-admin");

var createNewUser = require("../user/functions/createNewUser.js");
var successfulSignUp = require("../../services/nodemailer/successfulSignUp.js");

const postUser = async (req, res) => {
  console.log("Post User Controller");

  // Take User ID and create new User
  try {
    if (req.body.credential === "customer") {
      var createNewUserResult = await createNewUser(req.body.userId, req.body);

      console.log(createNewUserResult);
      if (createNewUserResult.ok === true) {
        if (typeof req.body.email !== "undefined") {
          console.log("There is an email in body");
          successfulSignUp(req.body.email);
        } else {
          console.log("No email in body");
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
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};

module.exports = postUser;
