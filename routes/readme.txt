This cart folder "routes\readMeFile.txt" contains the possible routes used for App

-- All routes use the following helper functions:
1. verifyUserIdToken: - always want to verify who is requesting information to the database, check if token is not fabricated before any further actions
2. handleCredentialClaims: - check who user is claiming to be? either a customer or admin 

-- each file uses the express router to handle the cart controllers such as the .get, .post, .patch & .delete at least 3 of this restful APIs are used 
for each different task
----------------------------------------------------------------------------------------------------------------------------------------------------------
cart: using express router to execute cart task actions
----------------------------------------------------------------------------------------------------------------------------------------------------------
products: using express router to execute product functionalities 
----------------------------------------------------------------------------------------------------------------------------------------------------------
reviews: using express router to execute reviews functionalities
----------------------------------------------------------------------------------------------------------------------------------------------------------
user: using express router to execute user intended functionalities
----------------------------------------------------------------------------------------------------------------------------------------------------------
