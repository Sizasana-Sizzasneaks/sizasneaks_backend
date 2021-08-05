function prepareReviews(reviews) {
  try {
    var output = {};

    //Set Actual Review Data
    output.reviews = reviews;

    //Set review Count
    output.reviewCount = reviews.length;

    //Calculate and Set Rating Average
    var ratingSum = 0;
    reviews.forEach((review) => {
      ratingSum += review.rating;
    });

    var ratingAverage = ratingSum / reviews.length;
    output.ratingAverage = Math.round(ratingAverage);

    return {ok:true, data: output};
  } catch (error) {
    return {ok:false, message: "Failed to Prepare View Data"};

  }
}

module.exports = prepareReviews;
