This folder "controllers\cart\functions\readMeText.txt" contains the following functions 
associated with cart routes.   

-------------------------------------------------------------------------------------------------------------------------------------
prepareCartData:
Inputs(Arguments)
1. cart - function receives a cart object 

Use(purpose)
This function then executes a validation activity such as checking if users product is available in the inventory.
Other purpose is to retrieve other information regarding the product that are not found in the cart object.  

Output(Returns)
This function returns an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution 
2. data (array) - this array value returns the products stored in the cart
3. message (string) -  a string message returns an error message if the ok value is false else no error message sends data

-------------------------------------------------------------------------------------------------------------------------------------
createCartItem:
Inputs(Arguments)
1. userID - its a unique string that identifies a user
2. product_id - identifies a unique product item with the database
3. variant - receives an array products variants details such as color & size

Use(purpose)
This functions adds users selected item to the cart database ---read mongoose documentation

Output(Returns)
This function returns an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. message (string) - a string message returns an error message or a success message 

-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------
checkProductAvailability:
Inputs(Arguments)
1. cartItem - its the product object 

Use(purpose)
This function checks product availability in terms of the color and size. It also verifies if products visibility is set to show 
and product quantity is greater than the customers requested quantity

Output(Returns)
This function return an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. data (array) - this array value returns the products stored in the cart
3. message(string) - a string message returns an error message if the ok value is false else no error message sends data
 
-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------
retreiveCartByUserId:
Inputs (Arguments)
1. userID - its a unique string that identifies a user

Use (Purpose)
This function receives the argument in order to gain information regarding to what user has stored in their cart.  

Output(Returns)
This function return an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. data (array) - this array value returns the products stored in the cart
3. message(string) - a string message returns an error message if the ok value is false else no error message sends data

-------------------------------------------------------------------------------------------------------------------------------------
updateCartItemQuantity:
Inputs(Arguments)
1. userId - its a unique string that identifies a user
2. product_id - identifies a unique product item with the database
3. option - its a shopping cart item surrogate key used as an identifier
4. newQuantity - the new quantity number set by user in the frontend

Use (Purpose)
This function Performs the act of updating the quantity of a cart item within a user's shopping cart. Its action is to working in with 
the database changes than actual returning data response to user

Output(Returns)
This function return an  that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. message(string) - a string message returns an error message if the ok value is false else no error message sends data

-------------------------------------------------------------------------------------------------------------------------------------
deleteSingleCartItem:
Inputs(Arguments)
1. userId - its a unique string that identifies a user
2. product_id - identifies a unique product item with the database
3. option - its a shopping cart item surrogate key used as an identifier

Use (Purpose)
This function performs the act of deleting a single cart item within a user's shopping cart. Its action is to working in with 
the database changes than actual returning data response to user

Output(Returns)
This function return an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. message(string) - a string message returns an error message if the ok value is false else no error message sends data

-------------------------------------------------------------------------------------------------------------------------------------
calculateCartSummary:
Inputs(Arguments)
1. cart - function receives a cart object

Use (Purpose)
This function performs the necessary calculations needed for the shopping cart. It calculates the carts total cost price,
how many items user has and the sets the delivery charges.  

Output(Returns)
This function return an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. data (array) - this array value returns the cart object & the cart summary details
3. message(string) - a string message returns an error message if the ok value is false else no error message sends data

-------------------------------------------------------------------------------------------------------------------------------------



