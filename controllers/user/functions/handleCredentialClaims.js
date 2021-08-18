function handleCredentialClaims(req, res, next) {
  //finding out if the token found in the headers is authorized its who they say they are
  // first check if credential claims is true/valid
  if (req.headers["credentialclaims"]) {
    // claiming to be an admin user 
    if (req.headers["credentialclaims"] === "administrator") {
      req.body.credentialClaims = "administrator";
    } // claiming to be a customer user
    else if (req.headers["credentialclaims"] === "customer") {
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
