var { STATUS_CODE } = require("../constants/httpConstants.js");
const retrieveUserDetails = require("./functions/retrieveUserDetails.js");

const getUser = async function (req, res) {
  console.log("Get User Controller");

  try {
    // check if its a customer
    if (req.body.credential === "customer") {
      //pass parameters used to search what user details to 
      //return back matching the projection
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

     // if user details found send back else send error message
      if (retrieveUserDetailsResult.ok === true) {
        res.statusCode = STATUS_CODE.SUCCESS;
        res.send(retrieveUserDetailsResult.data);
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
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

module.exports = getUser;
