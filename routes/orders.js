var express = require("express");
const router = express.Router();

//Verify User ID
/* const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");
 */
//Get Reviews Controller & Route
/* const getOrderItem = require("../controllers/reviews/getReviews.js");
router.get(
  "/:product_id",
  handleCredentialClaims,
  verifyUserIdToken,
  getOrderItem
); */

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