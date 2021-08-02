function handleCredentialClaims(req, res, next) {
  if (req.headers["credentialclaims"]) {
    if (req.headers["credentialclaims"] === "administrator") {
      req.body.credentialClaims = "administrator";
    } else if (req.headers["credentialclaims"] === "customer") {
      req.body.credentialClaims = "customer";
    } else {
      req.body.credentialClaims = "unknown";
    }
  } else {
    req.body.credentialClaims = "unknown";
  }

  next()
}

module.exports = handleCredentialClaims;
