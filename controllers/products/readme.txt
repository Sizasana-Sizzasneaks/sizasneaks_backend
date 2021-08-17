This folder "controllers\products" holds all the express middleware functions associated with product/inventory manipulation.

Information pertaining to the https routes that invoke the middleware functions bellow can be found at "routes\products.js"

Arguments
- All Functions receive the following functions
1. req (object) - This is a http(s) request object that contains details of the request that has invoked the execution of a function.
2. res (object) - This is a http(s) response object used to produce and send a response for a corresponding request.
3. next (function) - This is a callback function that can be called within function execution in order to pass execution on to the next middleware function.

Functions
---------------------------------------------------------------------------------------------
getProduct.js

This middleware function performs the act of retrieving a single product/inventory item. 
The specific fields of product that are returned depends on the credential type of the client that has invoked this function. 

---------------------------------------------------------------------------------------------
getProducts.js

This middleware function performs the act of retrieving  product/inventory item's from the product collection.  
The specific fields of product that are returned depends on the credential type of the client that has invoked this function. 
The collection of documents returned by this function is based on the search criteria supplied within the 
route, and query parameters of the request object it receives upon invocation. 

---------------------------------------------------------------------------------------------
postProduct.js

This middleware function performs the act of creating a new product/inventory item.  
This function only executes successfully when supplied a credential type of "administrator".
All details of the new product are supplied within the body of the request object that invokes this function.

---------------------------------------------------------------------------------------------
putProduct.js

This middleware function performs the act of updating a specific product/inventory item.  
This function only executes successfully when supplied a credential type of "administrator".
All details of the product that must be updated are supplied within the body of the request object that invokes this function.