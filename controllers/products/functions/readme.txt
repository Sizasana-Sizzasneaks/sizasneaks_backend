This folder "controllers\products\functions" holds all the functions associated with product and inventory manipulation. 

Functions
----------------------------------------------------------------------------
createProduct.js

Inputs(Arguments)
1. product (object) - The is a product object built using the product schema that can be found at  "models\product.js".

Use(Purpose)
This function receives its Arguments and uses them to create a new product/inventory item.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.

------------------------------------------------------------------------------
retrieveProductById.js

Inputs(Arguments)
1. userCredential (String) - Identifies the user type of the client invoking this function. 
2. productId (String) - Identifies a unique product item with the database.

Use(Purpose)
This function aims are getting a specific product/inventory item's details, filtering the data it returns based on the credential type it receives.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.
3. data (object) - This variable contains an object with the details of the product that matches the arguments supplied.

----------------------------------------------------------------------------------
retrieveProducts.js

Inputs(Arguments)
1. search (object) - This object contains variables that match fields within the database, in order to find a matching document. - Refer to Mongoose Documentation
2. projection (object) - This object contains field variables and instructions that are used to indicate which data fields to return. - Refer to Mongoose Documentation

Use(Purpose)
This function aims are getting product/inventory item(s) based on a search criteria, filtering the data it returns based on the projection object it receives.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.
3. data (object) - This variable contains an array of product/inventory items that match the arguments supplied.

-----------------------------------------------------------------------------------
retrieveProductsByCategory.js

Inputs(Arguments)
1. userCredential (String) - Identifies the user type of the client invoking this function. 
1. queryObject (object) - This object contains variables that match fields within the database, in order to find a matching document.

Use(Purpose)
This function aims are getting product/inventory item(s) based on a search criteria, filtering the data it returns based on the credential type it receives.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.
3. data (object) - This variable contains an array of product/inventory items that match the arguments supplied.

-----------------------------------------------------------------------------------
updateProduct.js

Inputs(Arguments)
1. productId (String) - This variable holds a unique identifier that identifies a single product/inventory item.
1. productData (object) - This object contains variables that match fields within a product/inventory item document. This is the data to replace in the document.
 
Use(Purpose)
This method performs the act of updating a specific product item, the item is first identified by its product id,
then when a corresponding product is found the new product data supplied replaces all the corresponding fields within the database document.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.