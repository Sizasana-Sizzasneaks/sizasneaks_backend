var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");


//Check Credential
//const checkCredential = require("../controllers/user/functions/checkCredential.js");


//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//Get Reviews Controller & Route
const getReviews = require("../controllers/reviews/getReviews.js");
router.get("/:product_id" , getReviews);

//Create Reviews Controller & Route
const createReview = require("../controllers/reviews/createReview.js");
router.get("/" , createReview);

//Delete Reviews Controller & Route
const deleteReview = require("../controllers/reviews/deleteReview.js");
router.delete("/:review_id" ,handleCredentialClaims,verifyUserIdToken,deleteReview);

module.exports = router;
