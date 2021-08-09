var admin = require("firebase-admin");

//Initialize Firebase Admin

//Customer Platform

const firebaseCustomerAccountConfig = {
  credential: admin.credential.cert({
    type: process.env.FIREBASE_PLATFORM_TYPE,
    project_id: process.env.FIREBASE_PLATFORM_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PLATFORM_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PLATFORM_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_PLATFORM_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_PLATFORM_CLIENT_ID,
    auth_uri: process.env.FIREBASE_PLATFORM_AUTH_URI,
    token_uri: process.env.FIREBASE_PLATFORM_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_PLATFORM_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_PLATFORM_CLIENT_CERT_URL,
  }),
};

const firebaseCustomerAccount = admin.initializeApp(
  firebaseCustomerAccountConfig
);

//Admin Platform

const firebaseAdminAccountConfig = {
  credential: admin.credential.cert({
    type: process.env.FIREBASE_ADMIN_TYPE,
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_ADMIN_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_CERT_URL,
  }),
};

const firebaseAdminAccount = admin.initializeApp(
  firebaseAdminAccountConfig,
  "administrator"
);

module.exports = { firebaseAdminAccount, firebaseCustomerAccount };
