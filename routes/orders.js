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
router.put("/:orderId", handleCredentialClaims, verifyUserIdToken,putOrder);

//Cancel an order Controller and route
const putCancelOrder = require("../controllers/orders/putCancelOrder.js");
router.put("/cancel", putCancelOrder);

/* const postOrderItem = require("../controllers/orders/postOrderItem.js");
router.post(
  "/orderItem",
  postOrderItem
);  */

const postOrder = require("../controllers/orders/postOrder.js");
router.post("/", postOrder);

module.exports = router;
