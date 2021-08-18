function prepareReviews(reviews) {
  try {
    var output = {};

    //Set reviews supplied to their variable within output object
    output.reviews = reviews;

    //Set value to record the total review count
    output.reviewCount = reviews.length;

    //Calculating the average rating of all reviews supplied.
    var ratingSum = 0;
    reviews.forEach((review) => {
      ratingSum += review.rating;
    });
    var ratingAverage = ratingSum / reviews.length;
    output.ratingAverage = Math.round(ratingAverage); //Storing that averageScore value in the function output object..

    return { ok: true, data: output }; //Returning successfully when all calculations and operations happen successfully.
  } catch (error) {
    return { ok: false, message: "Failed to Prepare View Data" }; //Returning unsuccessfully when all calculations fail unexpectedly.
  }
}

module.exports = prepareReviews;
