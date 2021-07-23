var admin = require("firebase-admin");
var { STATUS_CODE } = require("../../constants/httpConstants.js");

function verifyUserIdToken(req, res, next) {
  try {
    if (req.headers["authorization"]) {
      //Get Identity Token from Request
      var idToken = req.headers["authorization"]
        .replace("Bearer", "")
        .replace(" ", "");

      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          const uid = decodedToken.uid;
          req.id = uid;
          next();
        })
        .catch((error) => {
          //Throw failed to verify token Error
          throw new Error();
        });
    } else {
      //Throw Token was not Supplied Error
      throw new Error("No Auth Header Supplied");
    }
  } catch (error) {

    //Handle THe Errors.
    console.log("Error Thrown");
    console.log(error);

    res.statusCode = STATUS_CODE.UNAUTHORIZED;
    res.send("Unauthorized");

  }
}

module.exports = verifyUserIdToken;
