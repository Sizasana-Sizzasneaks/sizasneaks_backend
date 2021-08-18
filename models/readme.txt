This folder "models" contains the schema details pertaining to the structure of the data being stored within the systems database.
This system uses the MongoDB database to store all persistent data. MongoDB is a Document - oriented NoSQL database, where information
is stored in collections of BSON formatted documents.  - "https://docs.mongodb.com/"

The data model files within this folder use the Mongoose API to construct schema objects that detail the requirements of the data model.

Models
------------------------------------------------------------------------------------
models\Admin.js 

The Structure of a single document within the administrator collections where a single 
document contains the details of a single system user of type administrator.
------------------------------------------------------------------------------------
models\Customer.js

The structure of a single document within the "customer" collections where a single 
document contains the details of a single system user of type customer.
------------------------------------------------------------------------------------
models\product.js

The structure of a single document within the "product" collection where a single 
document contains and represents the details of a single product.
------------------------------------------------------------------------------------
models\ProductOption.js

This file contains the object that details the structure of a product option. 
Each product contains an array of product option's and this file details the data structure of
these product options. 

------------------------------------------------------------------------------------
models\Variant.js

This file contains the object that details the structure of a product option variant.
Each product option contains multiple variants.    

------------------------------------------------------------------------------------
models\ReviewReply.js

This file details the structure of a review reply. A single review can contain multiple 
review replies that are written by administrators. These review replies contain the body
message and timestamp.
------------------------------------------------------------------------------------
models\ShoppingCartItem.js

This file contains an object that details the structure of a shopping cart item.
Users of type customers are able to add shopping cart items to their shopping cart. 
