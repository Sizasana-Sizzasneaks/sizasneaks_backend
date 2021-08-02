var admin = require("firebase-admin");

//Initialize Firebase Admin

//Customer Platform
const firebaseCustomerAccountCredentials = require("../sizasana-ecommerce-platform-firebase-adminsdk-ih9us-774083c135.json");

const firebaseCustomerAccountConfig = {
  credential: admin.credential.cert(firebaseCustomerAccountCredentials),
};

const firebaseCustomerAccount = admin.initializeApp(
  firebaseCustomerAccountConfig
);

//Admin Platform
const firebaseAdminAccountCredentials = require("../sizasana-ecommerce-admin-firebase-adminsdk-541f9-a0b485ac5b.json");

const firebaseAdminAccountConfig = {
  credential: admin.credential.cert(firebaseAdminAccountCredentials),
};

const firebaseAdminAccount = admin.initializeApp(
  firebaseAdminAccountConfig,
  "administrator"
);

module.exports = { firebaseAdminAccount, firebaseCustomerAccount };
