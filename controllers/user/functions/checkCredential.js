const Admin = require("../../../models/Admin.js");
const Customer = require("../../../models/Customer.js");

async function checkCredential(req, res, next) {
  var userId = await req.body.userId;
  await console.log(userId);

  var isAdminResult = await isAdmin(userId);

  if (isAdminResult.ok === true) {
    req.body.credential = "administrator";
    next();
  } else {
    if (isAdminResult.message === "Not admin") {
      var isCustomerResult = await isCustomer(userId);

      if (isCustomerResult.ok === true) {
        req.body.credential = "customer";
        next();
      } else {
        if (isCustomerResult.message === "Not customer") {
          res.status = STATUS_CODE.UNAUTHORIZED;
          res.send({ ok: false, message: "Unknown credentials" });
        } else {
          res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
          res.send({ ok: false, message: "INTERNAL_SERVER_ERROR" });
        }
      }
    } else {
      res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
      res.send({ ok: false, message: "INTERNAL_SERVER_ERROR" });
    }
  }
}

async function isAdmin(userId) {
  return Admin.find({ userId: userId }, { _id: 1, userId: 1 })
    .then((docs) => {
        
      if (docs.length !== 0 && docs[0].userId === userId) {
        return { ok: true, message: "Is admin" };
      } else {
        return { ok: false, message: "Not admin" };
      }
    })
    .catch((error) => {
        
      return { ok: false, error: "Failed to Check Credential" };
    });
}

async function isCustomer(userId) {
  return Customer.find(
    { userId: userId },
    {
      _id: 1,
      userId: 1,
    }
  )
    .then((docs) => {
      if (docs.length !== 0 && docs[0].userId === userId) {
        return { ok: true, message: "Is customer" };
      } else {
        return { ok: false, message: "Not customer" };
      }
    })
    .catch((error) => {
      return { ok: false, error: "Failed to Get User Details" };
    });
}

module.exports = checkCredential;
