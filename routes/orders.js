var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//Get Orders Controller & Route
const getOrders = require("../controllers/orders/getOrders.js");
router.get("/", handleCredentialClaims, verifyUserIdToken, getOrders);

//Get an Order Controller & Route
const getOrder = require("../controllers/orders/getOrder.js");
router.get("/order_item", handleCredentialClaims, verifyUserIdToken, getOrder);

//Update a Specific Order Controller & Route
const putOrder = require("../controllers/orders/putOrder.js");
router.put("/:orderId", handleCredentialClaims, verifyUserIdToken, putOrder);

//Cancel an order Controller and route
const putCancelOrder = require("../controllers/orders/putCancelOrder.js");
router.put("/cancel", putCancelOrder);

//Post Order - Creating and Order
const postOrder = require("../controllers/orders/postOrder.js");
router.post("/", handleCredentialClaims, verifyUserIdToken, postOrder);

//Post Order Payment for a single Order
const postOrderPayment = require("../controllers/orders/postOrderPayment.js");
router.post(
  "/payment",
  handleCredentialClaims,
  verifyUserIdToken,
  postOrderPayment
);

module.exports = router;
