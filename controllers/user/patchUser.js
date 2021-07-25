var { STATUS_CODE } = require("../constants/httpConstants.js");
const updateUser = require("./functions/updateUser.js");

const patchUser = async function (req, res) {
  console.log("Patch User Controller");

  
  var updateUserResult = await updateUser(req.id,req.body);

  if (updateUserResult.ok === true){
    res.status=STATUS_CODE.SUCCESS;
    res.send({ok: true});
  }
  else{
    res.status = STATUS_CODE.UNAUTHORIZED;
    res.send({ok: false, error: "Backend Error"});
  }
};

module.exports = patchUser;
