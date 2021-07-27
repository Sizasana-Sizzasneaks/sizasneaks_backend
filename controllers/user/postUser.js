var admin = require("firebase-admin");

var createNewUser = require("../user/functions/createNewUser.js");

const postUser =  async (req, res) => {
  console.log("Post User Controller");

  // Take User ID and create new User
  try {
    var createNewUserResult = await createNewUser(req.body.userId, req.body);

    console.log(createNewUserResult);
    if(createNewUserResult.ok === true){
      res.status = STATUS_CODE.SUCCESS;
      res.send({ok: true});
    }else{
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send(createNewUserResult);
    }
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
};

module.exports = postUser;
