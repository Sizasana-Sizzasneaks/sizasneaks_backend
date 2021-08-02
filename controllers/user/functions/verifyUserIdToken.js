const {
  firebaseCustomerAccount,
  firebaseAdminAccount,
} = require("../../../config/firebaseConfig.js");

var { STATUS_CODE } = require("../../constants/httpConstants.js");

async function verifyUserIdToken(req, res, next) {
  if (req.headers["authorization"]) {
    //Get Identity Token from Request
    var idToken = req.headers["authorization"]
      .replace("Bearer", "")
      .replace(" ", "");

    var getIdFromTokenCustomerResult = await getIdFromToken(
      firebaseCustomerAccount,
      idToken
    );

    if (getIdFromTokenCustomerResult.ok === true) {
      req.body.userId = getIdFromTokenCustomerResult.data;
      req.body.credential = "customer";
      next();
    } else {
      var getIdFromTokenAdminResult = await getIdFromToken(
        firebaseAdminAccount,
        idToken
      );

      if (getIdFromTokenAdminResult.ok === true) {
        req.body.userId = getIdFromTokenAdminResult.data;
        req.body.credential = "administrator";
        next();
      } else {
        res.statusCode = STATUS_CODE.UNAUTHORIZED;
        res.send({ ok: false, error: "Invalid Token" });
      }
    }
  } else {
    res.statusCode = STATUS_CODE.UNAUTHORIZED;
    res.send({ ok: false, error: "No User Authentication Header" });
  }
}

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
