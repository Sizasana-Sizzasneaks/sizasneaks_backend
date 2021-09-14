var { STATUS_CODE } = require("../constants/httpConstants.js");
const updateUser = require("./functions/updateUser.js");
var { successfulSignUp } = require("../../services/emailing/emailing.js");

const patchUser = async function (req, res) {
  console.log("Patch User Controller");
  console.log(req.body);

  try {
    //checks if it is a customer else deny access
    if (req.body.credential === "customer") {
      var updateUserResult = await updateUser(req.body.userId, req.body);

      // validate result value return
      if (updateUserResult.ok === true) {
        if (
          typeof req.body.email !== "undefined" &&
          typeof req.body.isAnonymous !== "undefined"
        ) {
          if (!req.body.isAnonymous) {
            //Send Successful Sign Up
            successfulSignUp(req.body.email);
          }
        }

        res.status = STATUS_CODE.SUCCESS;
        res.send({ ok: true });
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send(updateUserResult);
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        error: "Access Denied",
      });
    }
  } catch (error) {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unknown Server Error" });
  }
};

module.exports = patchUser;
