This cart folder "controllers\user\functions\readMeFile.txt" contains the following functions 
associated with user routes.   
-------------------------------------------------------------------------------------------------------------------------------------
createNewUser:
Inputs(Arguments)
1. userId (string) - its a unique string that identifies a user
2. userData (string) - contains values of user when such as user name and other personal details  

Use(Purpose):
This function creates a user and checks if user name exists in the mongoose database user collection --see Mongoose documentation 

Output(Returns):
1. ok (boolean) -this notifies other functions it was a successful execution or a failed execution 
2. message (string) -a string error or successful message 
-------------------------------------------------------------------------------------------------------------------------------------
retrieveUserDetails:
Inputs(Arguments)
1. userId (string) - 
2. projection (array) - the value to search for in the user collection 

Use(Purpose):
This function gets information from the database from the user collection  

Output(Returns):
1. ok (boolean) -this notifies other functions it was a successful execution or a failed execution 
2. error (string) -a string error or successful message 
3. data (array) - array value of user object 
-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------
verifyUserIdToken:
Inputs(Arguments)
- Function receive the following:
1. req (object) - This is a http(s) request object that contains details of the request that has invoked the execution of a function.
2. res (object) - This is a http(s) response object used to produce and send a response for a corresponding request.
3. next (function) - This is a callback function that can be called within function execution in order to pass execution on to 
the next middleware function.

Use(Purpose):
This functions purpose is get userId token and check if its valid according the token stored in the firebase and check if its an
admin or a customers token

Output(Returns):
1. ok (boolean) -this notifies other functions it was a successful execution or a failed execution 
2. error (string) -a string error or successful message 
-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------
prepareUserData
Inputs(Arguments)
1. data (array) - this array value contains users details  

Use(Purpose):
The function purpose is to create a user display name for user

Output(Returns):
1. output (object) - this function returns an object of the users initials to be displayed in the frontend

-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------
handleCredentialClaims:
Inputs(Arguments)
- Function receive the following:
1. req (object) - This is a http(s) request object that contains details of the request that has invoked the execution of a function.
2. res (object) - This is a http(s) response object used to produce and send a response for a corresponding request.
3. next (function) - This is a callback function that can be called within function execution in order to pass execution on to 
the next middleware function.

Use(Purpose):
The function purpose is to clarify the credentials provided by the frontend before gaining access to the backend sensitive 
information

Output(Returns): Has no returns
-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------
checkCredential:
Inputs(Arguments)
- Function receive the following:
1. req (object) - This is a http(s) request object that contains details of the request that has invoked the execution of a function.
2. res (object) - This is a http(s) response object used to produce and send a response for a corresponding request.
3. next (function) - This is a callback function that can be called within function execution in order to pass execution on to 
the next middleware function.

Use(Purpose):
This function is to confirm if the user is found in the database. By verifying if customer exists and 
if the userId provided belongs to an admin 

Output(Returns):
1. ok (boolean) -this notifies other functions it was a successful execution or a failed execution 
2. message (string) - a string error or successful message 
-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------
updateUser:
Inputs(Arguments)
1. userId (string) - its a unique string that identifies a user
2. userData (string) - contains values of user when such as user name and other personal details 

Use(Purpose):
This function is to amend customer database collection

Output(Returns):
1. ok (boolean) -this notifies other functions it was a successful execution or a failed execution 
2. error (string) - a string error or successful message 
-------------------------------------------------------------------------------------------------------------------------------------