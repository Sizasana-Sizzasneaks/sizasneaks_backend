This folder "controllers\reviews" holds all the express middleware functions associated with product review manipulation.

Information pertaining to the https routes that invoke the middleware functions bellow can be found at "routes\reviews.js"

Arguments
- All Functions receive the following functions
1. req (object) - This is a http(s) request object that contains details of the request that has invoked the execution of a function.
2. res (object) - This is a http(s) response object used to produce and send a response for a corresponding request.
3. next (function) - This is a callback function that can be called within function execution in order to pass execution on to the next middleware function.

Functions
---------------------------------------------------------------------------------------------
deleteReview.js

This middleware function is called when a client requests the deletion of a product review. This function 
first checks the credential type supplied within the request object as deleting of a review can only be done by 
an administrator or the customer (user) that wrote it. After  going through these checks the deletion of 
the specified review is executed using the review helper functions. 
The functions can be found at found at -  "controllers\reviews\functions".

---------------------------------------------------------------------------------------------
getReviews.js

This middleware function aims to performs the task of retrieving customer reviews.
These reviews are sourced based on a product_id that is supplied in the request object.
The fields to be returned are determined by the user credential type specified within the request object
that is supplied when this function is invoked.

---------------------------------------------------------------------------------------------
postReview.js

This middleware function aims to deal with the creation of new product reviews.
The details required to create a new product review are supplied through the request object supplied as a function argument.
These details include the product_id, userId, reviewScore and reviewBody. 
A person must be a non-guest customer in order two write a product review.

---------------------------------------------------------------------------------------------
postReviewReply.js

This middleware function aims to deal with the adding replies to product reviews written by customers. 
Review Replies are written by the administrator and are then stored together with the corresponding document 
in the review collection.
After saving the reply to the review, the customer responsible for the product review is sent an email containing 
the details of the review, product and the replies attached to it. 

