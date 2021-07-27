var admin = require("firebase-admin");
var { STATUS_CODE } = require("../../constants/httpConstants.js");

async function verifyUserIdToken(req, res, next) {
  
  if (req.headers["authorization"]) {
    //Get Identity Token from Request
    var idToken = req.headers["authorization"]
      .replace("Bearer", "")
      .replace(" ", "");

    var getIdFromTokenResult = await getIdFromToken(idToken);

    if (getIdFromTokenResult.ok === true) {
      req.body.userId = getIdFromTokenResult.data;
      next();
    } else {
      res.statusCode = STATUS_CODE.UNAUTHORIZED;
      res.send({ ok: false, error: "Invalid Token" });
    }
  } else {
    res.statusCode = STATUS_CODE.UNAUTHORIZED;
    res.send({ ok: false, error: "No User Authentication Header" });
  }
}

async function getIdFromToken(idToken) {
  var output;

  await admin
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
