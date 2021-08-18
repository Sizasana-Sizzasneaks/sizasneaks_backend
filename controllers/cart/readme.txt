This cart folder "controllers\cart\readMeText.txt" contains the restful API routes used for cart

Arguments
- All Functions receive the following functions
1. req (object) - This is a http(s) request object that contains details of the request that has invoked the execution of a function.
2. res (object) - This is a http(s) response object used to produce and send a response for a corresponding request.
3. next (function) - This is a callback function that can be called within function execution in order to pass execution on to 
the next middleware function.

------------------------------------------------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------------------------------------------------------------------
getCart:
This route function helps retrieve data from the database and send back the cart item to the frontend shopping cart page 

-------------------------------------------------------------------------------------------------------------------------------------
postCartItem:
As a post restful API its more of sending data to the database creating a cart object to the user collection. To avoid duplications
routes will check if the cart item already exists rather manipulate the quantity by increasing it. No response is sent back to the 
frontend but rather if process fail send error message
-------------------------------------------------------------------------------------------------------------------------------------
patchCartItem:
As a patch restful API is associated with making specific changes to database collection, this function would manipulate users cart 
items quantity
-------------------------------------------------------------------------------------------------------------------------------------
deleteCartItem:
This route function is called when user requests to delete a user cart item 
-------------------------------------------------------------------------------------------------------------------------------------
   