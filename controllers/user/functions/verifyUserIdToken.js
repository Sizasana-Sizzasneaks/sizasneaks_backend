const {
  firebaseCustomerAccount,
  firebaseAdminAccount,
} = require("../../../config/firebaseConfig.js");

var { STATUS_CODE } = require("../../constants/httpConstants.js");

async function verifyUserIdToken(req, res, next) {
  // check if user is an administrator
  if (req.body.credentialClaims === "administrator") {

    // retrieve token from the http request header  
    var getTokenFromHeaderResult = getTokenFromHeader(req);
    if (getTokenFromHeaderResult.ok === true) {
      var getIdFromTokenAdminResult = await getIdFromToken(
        firebaseAdminAccount,
        getTokenFromHeaderResult.data
      );
      if (getIdFromTokenAdminResult.ok === true) {
        req.body.userId = getIdFromTokenAdminResult.data;
        req.body.credential = "administrator";
        next();
      } else {
        res.statusCode = STATUS_CODE.UNAUTHORIZED;
        res.send({ ok: false, error: "Invalid Token" });
      }
    } else {
      res.statusCode = STATUS_CODE.UNAUTHORIZED;
      res.send(getTokenFromHeaderResult);
    }
    // check if its a customer  
  } else if (req.body.credentialClaims === "customer") {
    var getTokenFromHeaderResult = getTokenFromHeader(req);
    if (getTokenFromHeaderResult.ok === true) {
      var getIdFromTokenCustomerResult = await getIdFromToken(
        firebaseCustomerAccount,
        getTokenFromHeaderResult.data
      );

      if (getIdFromTokenCustomerResult.ok === true) {
        req.body.userId = getIdFromTokenCustomerResult.data;
        req.body.credential = "customer";
        next();
      } else {
        res.statusCode = STATUS_CODE.UNAUTHORIZED;
        res.send({ ok: false, error: "Invalid Token" });
      }
    } else {
      res.statusCode = STATUS_CODE.UNAUTHORIZED;
      res.send(getTokenFromHeaderResult);
    }
  } else {
  // user is not a customer nor an admin could be an intercepted attacker 
    req.body.credential = "unknown";
    next();
  }
}
// using the frontend http request header to gain the token
function getTokenFromHeader(req) {
  if (req.headers["authorization"]) {
    //Get Identity Token from Request
    var idToken = req.headers["authorization"]
      .replace("Bearer", "")
      .replace(" ", "");
    return { ok: true, data: idToken };
  } else {
    return { ok: false, message: "No Authentication Header Supplied" };
  }
}
// using the token to get the userId
async function getIdFromToken(firebaseInstance, idToken) {
  var output;

  await firebaseInstance
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      output = { ok: true, data: uid };
    })
    .catch((error) => {
      output = { ok: false, error: "Token Verification Failed" };
    });

  return output;
}

module.exports = verifyUserIdToken;
