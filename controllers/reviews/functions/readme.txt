This folder "controllers\reviews\functions" holds all the functions associated with product review manipulation. 

Functions
----------------------------------------------------------------------------
addReviewReply.js

Inputs(Arguments)
1. reviewId (String) - Identifies a unique product review within the collection of reviews
2. reviewReply (String) - A text based message reply to be associated with a specific product review.

Use(Purpose)
This function aims at adding a reply message to a specific product review written by a client (customer).
Product Review Replies are written by administrators. 

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.

----------------------------------------------------------------------------
createProductReview.js

Inputs(Arguments)
1. userId (String) - Unique string that identifies a specific user of this system.
2. productId (String) - Identifies a unique product item with the database.
3. reviewData (object) - This is an object that must contain a body (String) and rating (int) that make us the core part of a customer's product review.

Use(Purpose)
This function aims at creating new product reviews from the data it supplied through its arguments. 
It takes the userId it receives to source the details of the user that has requested for this review to be created. 
These user details are then attached to the new review document created in the review collection. Data concerning the associated
product are also stored with this record.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.

----------------------------------------------------------------------------
deleteReviewById.js

Inputs(Arguments)
1. reviewId (String) - Identifies a unique product review within the collection of reviews.

Use(Purpose)
This function aims at deleting a single review stored (document) within the review collection.
This review is identified using its unique document id.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.

----------------------------------------------------------------------------
prepareReviews.js

Inputs(Arguments)
1. reviews (Array[object]) - This is an array object that must contain objects that follow the Review schema detailed at - models\Review.js

Use(Purpose)
This function takes in a collection of review objects and prepares summative information about the collection of reviews.
This summative data consists of the total count of reviews and the average score for all review ratings.
All this summative information is returned together with all the review supplied to the function.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.
3. data (object) - This variable contains an object which hold all "reviews" supplied to the function, the "totalCount" of reviews and "averageScore".
----------------------------------------------------------------------------
RetrieveReviewById.js

Inputs(Arguments)
1. reviewId (String) - Identifies a unique product review within the collection of reviews.
2. projection (object) - This object contains field variables and instructions that are used to indicate which data fields to return. - Refer to Mongoose Documentation

Use(Purpose)
The aim of this function is to retrieve a specific review from the database collection of product reviews.
This is done by searching through this review collection for an id that matches the review id supplied to this function on invocation.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides a success/error message depending on the outcome of the method call.
3. data (object) - This variable contains an object which will hold the review which matches the review id supplied to this function.

----------------------------------------------------------------------------
RetriveReviews.js

Inputs(Arguments)
2. productId (String) - Identifies a unique product item with the database.
2. projection (object) - This object contains field variables and instructions that are used to indicate which data fields to return. - Refer to Mongoose Documentation

Use(Purpose)
This function aims at sourcing and returning all the customer reviews associated with a specific product.
This function scans through the reviews collection looking for reviews that contain a corresponding productId field.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides a success/error message depending on the outcome of the method call.
3. data (Array [object]) - This variable contains an object which will hold the reviews which match the product_id value supplied to this function.
