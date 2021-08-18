const Admin = require("../../../models/Admin.js");
const Customer = require("../../../models/Customer.js");

async function checkCredential(req, res, next) {
  // 
  var userId = await req.body.userId;
  //await console.log(userId);
  
  //first check the given userId is of admin
  var isAdminResult = await isAdmin(userId);

  if (isAdminResult.ok === true) {
    //provide the credential field a value
    req.body.credential = "administrator";
    next();
  } else {
    if (isAdminResult.message === "Not admin") {
      //else check the given userId is of customer
      var isCustomerResult = await isCustomer(userId);

      if (isCustomerResult.ok === true) {
        //provide the credential field a value
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

//below function returns an object of boolean and a message
async function isAdmin(userId) {
  //using Mongoose API to search through the database
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

//below function returns an object of boolean and a message
async function isCustomer(userId) {
  //using Mongoose API to search through the database
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
