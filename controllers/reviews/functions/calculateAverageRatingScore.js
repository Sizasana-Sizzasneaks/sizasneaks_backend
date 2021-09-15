function calculateAverageRatingScore(reviews) {
  try {
    var output = 0;

    //Calculating the average rating of all reviews supplied.
    var ratingSum = 0;
    reviews.forEach((review) => {
      ratingSum += review.rating;
    });
    var ratingAverage = ratingSum / reviews.length;
    output = Math.round(ratingAverage); //Storing that averageScore value in the function output object..

    return { ok: true, data: output }; //Returning successfully when all calculations and operations happen successfully.
  } catch (error) {
    return { ok: false, message: "Failed to Calculate Average Rating Score" }; //Returning unsuccessfully when all calculations fail unexpectedly.
  }
}

module.exports = calculateAverageRatingScore;
