This application serves as the backend server for the SIZZASNEAKS e-commerce platform.
This platform contains three web applications and this application serves as the backend of the full system.

This system is built using an MODEL VIEW CONTROLLER Structure. With this specific application holding the MODEL
and Controller functionality.

This document aims to give a technical overview on how this backend application functions and can be maintained.

This application receives requests directly from the two other Front-end web applications (Views), which then invoke
certain aspects of functionality that make up the entire business logic of this entire system.

NB. All Folders within this application contain a readme.txt file that provide further details on the contents of that folder. 

Details of the system
---------------------------------------------------------------------------------------------------------------------------
1. This backend application is built using NodeJs which is a JavaScript runtime environment.
2. The receiving of requests and the sending of responses is handled using the ExpressJS Framework.
3. All data manipulation including all CRUD (CREATE, READ, UPDATE, DELETE) operations are managed through
the mongoose api that provides this application with access to a MongoDB Database which serves as the primary database for this system. 


Structure of the application
----------------------------------------------------------------------------------------------------------------------------
1.Routes
This application hosts a RESTful API that is built using Express JS. 

All the routes of this API can be found within the "routes" folder. With associated functionality
being grouped into a single initial route and file. 

For Example - All Functionality associated with a product review is prefixed with the "/reviews" and can be found in the
corresponding file - "routes\reviews.js".

Each sub route then directs execution to a different CRUD operation.

Details regarding each route can be found in the routes folder, within the readme.txt file or the corresponding route file.

2. Controllers

The Controller folder holds various clusters of functionality that make up the business logic for this system.
Each aspect of functionality is provided with its own folder within the controller folder. 
For Example - Product/Inventory manipulation functionality can be found under the "controllers\products" folder. 

Each cluster folder contains functions that directly map to a specific route within the corresponding route file.
In addition to that, each cluster folder also contains a folder filled with modular functions that make up the 
functionality of that cluster.
This ensures that related functionality is stored together, making it easier to source, maintain and improve.

3. Models

The controller functions made above tend to need access to the systems database. This is done through the use of the data models 
within the "models" folder and the Mongoose API. 

This folder contains all the schema objects that structure how data is stored on the MongoDB Database. 
Information pertaining to these data structures can be fond inside the "models" folder. 


Additions System Components
---------------------------------------------------------------------------------------------------------------------
1. Services

This folder contains clusters of code that make up system external services that tend to help achieve certain business goals.

For Example - The emailing service, that consists of code that allows for the system to send various emails to system users
can be found in the "services\emailing" folder.

2. config

This folder contains any files that contain configuration code needed to access any packages or plugins being used in this system.




Application packages
---------------------------------------------------------------------------------------------------------------------------------
1. express - Used to create a server and handle receiving requests and responses.

2. firebase-admin - Requesting certain functionality from this server requires a
client to authenticate with the system. All frontend applications handle authentication through firebase authentication,
while all requests sent from those applications are authenticated using firebase-admin.

3. mongoose - This package handles the connection between this application and the MongoDB Database.

4. @sendgrid/mail - This package handles the connection between this application and the platforms SendGrid account which
is used to send emails out to various system users.

5. cors - Used to handle cross Origin Requests.

6. dotenv - used to handle environment variable needed to run this application

7. nodemon - (development) - Used to monitor changes with the application during development and invoke re-execution of
this application when changes have been saved. 