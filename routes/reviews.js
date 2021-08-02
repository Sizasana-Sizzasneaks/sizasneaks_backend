var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Check Credential
const checkCredential = require("../controllers/user/functions/checkCredential.js");

//Get Products Controller & Route
const getReviews = require("../controllers/reviews/getReviews.js");
router.get("/:product_id" , getReviews);


module.exports = router;
