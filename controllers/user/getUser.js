var { STATUS_CODE } = require("../constants/httpConstants.js");
const retrieveUserDetails = require("./functions/retrieveUserDetails.js");

const getUser = async function (req, res) {
  console.log("Get User Controller");

  try {
    if (req.body.credential === "customer") {
      var retrieveUserDetailsResult = await retrieveUserDetails(
        req.body.userId,
        {
          _id: 0,
          firstName: 1,
          lastName: 1,
          displayName: 1,
          isAnonymous: 1,
        }
      );

     
      if (retrieveUserDetailsResult.ok === true) {
        res.statusCode = STATUS_CODE.SUCCESS;
        res.send(retrieveUserDetailsResult.data);
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send(retrieveUserDetailsResult);
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
    res.send({
      ok: false,
      error: "Unnkown Server Error - (Wierd Get User Situation)",
    });
  }
};

module.exports = getUser;
