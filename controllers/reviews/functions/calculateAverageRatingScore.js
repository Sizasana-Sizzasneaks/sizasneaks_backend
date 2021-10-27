function calculateAverageRatingScore(reviews) {
  try {
    var output = 0;

    //Calculating the average rating of all reviews supplied.
    var ratingSum = 0;
    var reviewsLength = 0;
    reviews.forEach((review) => {
      if (review.approved) {
        ratingSum += review.rating;
        reviewsLength++;
      }
    });
    var ratingAverage = ratingSum / reviewsLength;
    output = Math.round(ratingAverage); //Storing that averageScore value in the function output object..

    return { ok: true, data: output }; //Returning successfully when all calculations and operations happen successfully.
  } catch (error) {
    return { ok: false, message: "Failed to Calculate Average Rating Score" }; //Returning unsuccessfully when all calculations fail unexpectedly.
  }
}

module.exports = calculateAverageRatingScore;
