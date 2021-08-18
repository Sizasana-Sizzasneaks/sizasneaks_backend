This folder "services\emailing" contains bundles of functions that perform emailing services for this backend application.

All emailing is done using a the third part library called Send Grid which allows users to manage email for
their platforms. - "https://sendgrid.com/"

Functions
--------------------------------------------------------------------------------------------------------
emailing.js

This file contains multiple functions that handle the sending of various types of emails on this platform.
These functions are as follows:-

----
1. successfulSignUp

Inputs (Arguments)
1. email (String) - This is a string variable that contains a users email address.

Use(Purpose)

This function takes in a users email address and sends a pre-templated email that welcomes a new user
on to the platform after they successful sign up.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.

2. reviewReplyEmail

Inputs (Arguments)
1. emailContent (Object) - This object must contain all the necessary details for a review reply email.
This includes the review details, product details, the customer email, and the replies attached to the
product review.

Use(Purpose)

This function takes in emailContent and uses that compose an email sent to a customer user when an administrator 
replies to their email, details such as, the associated product and the customers email address are sourced and
supplied to this function where the content is prepared and then send using a pre-templated email.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.

--------------------------------------------------------------------------------------------------------
prepareEmailContent.js

----
1. prepareReviewReplyEmailContent

Inputs (Arguments)
1. emailContent (Object) - This object must contain all the necessary details for a review reply email.
This includes the review details, product details, the customer email, and the replies attached to the
product review.

Use(Purpose)
This function takes in emailContent required for a review reply email and makes the data presentable within an
email. This involves converting timestamps into proper date time formats and any other necessary data preparation
needed before sending the email content to the emailing function.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.
3. data (object) - This variable contains an object with the details of the product that matches the arguments supplied.



