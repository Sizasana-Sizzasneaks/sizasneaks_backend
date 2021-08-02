var { STATUS_CODE } = require("../constants/httpConstants.js");
const updateUser = require("./functions/updateUser.js");

const patchUser = async function (req, res) {
  console.log("Patch User Controller");
  console.log(req.body);

  try {
    if (req.body.credential === "customer") {
      var updateUserResult = await updateUser(req.body.userId, req.body);

      if (updateUserResult.ok === true) {
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
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};

module.exports = patchUser;
