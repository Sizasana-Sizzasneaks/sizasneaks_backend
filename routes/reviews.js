var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");


//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//Get Reviews Controller & Route
const getReviews = require("../controllers/reviews/getReviews.js");
router.get("/:product_id" , getReviews);

//Create Reviews Controller & Route
const postReview = require("../controllers/reviews/postReview.js");
router.post("/:product_id" , handleCredentialClaims,verifyUserIdToken, postReview);

//Delete Reviews Controller & Route
const deleteReview = require("../controllers/reviews/deleteReview.js");
router.delete("/" , handleCredentialClaims,verifyUserIdToken, deleteReview);

module.exports = router;
