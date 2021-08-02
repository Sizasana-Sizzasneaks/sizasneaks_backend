var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Check Credential
const checkCredential = require("../controllers/user/functions/checkCredential.js");

//Get Reviews Controller & Route
const getReviews = require("../controllers/reviews/getReviews.js");
router.get("/:product_id" , getReviews);

//Create Reviews Controller & Route
const createReview = require("../controllers/reviews/createReview.js");
router.get("/" , createReview);

//Delete Reviews Controller & Route
const deleteReview = require("../controllers/reviews/deleteReview.js");
router.get("/" , deleteReview);

module.exports = router;
