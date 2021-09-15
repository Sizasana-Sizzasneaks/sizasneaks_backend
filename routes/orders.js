var express = require("express");
const router = express.Router();

//Verify User ID
/* const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");
 */
//Get Reviews Controller & Route
//Get Reviews Controller & Route
const getOrders = require("../controllers/orders/getOrders");
router.get(
  "/",getOrders
);

//Create Reviews Controller & Route
/* const postOrderItem = require("../controllers/orders/postOrderItem.js");
router.post(
  "/orderItem",
  postOrderItem
); */

const postOrder = require("../controllers/orders/postOrder.js");
router.post(
  "/",
  postOrder
);


module.exports = router;