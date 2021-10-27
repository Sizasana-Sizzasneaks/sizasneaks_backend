function prepareReviews(reviews) {
  try {
    var output = {};

    //Set reviews supplied to their variable within output object
    output.reviews = reviews;

    //Calculating the average rating of all reviews supplied.
    var ratingSum = 0;
    var reviewLength = 0
    reviews.forEach((review) => {
      if(review.approved){
        ratingSum += review.rating;
        reviewLength++
      }
     
    });
    //Set value to record the total review count
    output.reviewCount = reviewLength;
    var ratingAverage = ratingSum / reviewLength;
    output.ratingAverage = Math.round(ratingAverage); //Storing that averageScore value in the function output object..

    return { ok: true, data: output }; //Returning successfully when all calculations and operations happen successfully.
  } catch (error) {
    return { ok: false, message: "Failed to Prepare View Data" }; //Returning unsuccessfully when all calculations fail unexpectedly.
  }
}

module.exports = prepareReviews;
