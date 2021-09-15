var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");

//Get Reviews Controller & Route
const getReviews = require("../controllers/reviews/getReviews.js");
router.get(
  "/:product_id",
  handleCredentialClaims,
  verifyUserIdToken,
  getReviews
);

//Create Reviews Controller & Route
const postReview = require("../controllers/reviews/postReview.js");
const updateProductAverageRatingScore = require("../controllers/reviews/functions/updateProductAverageRatingScore.js");
router.post(
  "/:product_id",
  handleCredentialClaims,
  verifyUserIdToken,
  postReview,
  updateProductAverageRatingScore
);

//Delete Reviews Controller & Route
const deleteReview = require("../controllers/reviews/deleteReview.js");
router.delete(
  "/:review_id",
  handleCredentialClaims,
  verifyUserIdToken,
  deleteReview
);

//Admin Reply to Reviews
const postReviewReply = require("../controllers/reviews/postReviewReply.js");

router.post(
  "/reply/:review_id",
  handleCredentialClaims,
  verifyUserIdToken,
  postReviewReply
);

module.exports = router;
