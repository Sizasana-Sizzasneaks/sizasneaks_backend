This cart folder "controllers\user\readMeFile.txt" contains the restful API routes used for user

Arguments
- All Functions receive the following functions
1. req (object) - This is a http(s) request object that contains details of the request that has invoked the execution of a function.
2. res (object) - This is a http(s) response object used to produce and send a response for a corresponding request.
3. next (function) - This is a callback function that can be called within function execution in order to pass execution on to 
the next middleware function.
-----------------------------------------------------------------------------------------------------------------------------------------
getUser:
get user details from the backend 
-----------------------------------------------------------------------------------------------------------------------------------------
postUser:
creates a new user --- sign up page 
-----------------------------------------------------------------------------------------------------------------------------------------
patchUser:
makes a request to update user details
-----------------------------------------------------------------------------------------------------------------------------------------