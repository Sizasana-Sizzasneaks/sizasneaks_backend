const  mongoose  = require("mongoose");
const Product = require("../../../models/product.js");

function retrieveProducts(search, projection) {
  return Product.find(search, projection).lean() //Uses the Mongoose API to search the Product collection with a search and projection specified.
    .then((docs) => {
      if (docs.length !== 0) { //Checks that the function found at least a single object to return.
        return { ok: true, data: docs }; //Returning all documents that were found.
      } else {
        return { ok: false, data: docs, message: "No product match found" }; //Returning when no matching product document is found.
      }
    })
    .catch((error) => {
      if ( //Checking if the error thrown is due to an invalid value specified on the "_id" variable.
        error.path === "_id" &&
        error instanceof mongoose.CastError &&
        error.kind === "ObjectId"
      ) {
        return { ok: false, message: "Invalid Product Id" }; //Returning when the supplied search object contains an invalid product id value (invalid format).
      } else {
        console.log(error);
        return { ok: false, message: "Error When Getting Products" }; //Return a general error when the retrieving of products is unsuccessful.
      }
    });
}

module.exports = retrieveProducts;
