const mongoose = require("mongoose");
const Product = require("../../../models/product.js");

async function updateProduct(productId, productData) {
  try {
    if (
      //Checks that all function arguments are not undefined before execution.
      typeof productId !== "undefined" &&
      typeof productData !== "undefined" &&
      productData instanceof Object
    ) {
      return Product.updateOne({ _id: productId }, productData) //Performs the update of the
        .then(() => {
          return { ok: true, message: "fields Updated." }; //Returning when the update of a product is successful.
        })
        .catch((error) => {
          if (
            //Checking if the error thrown is due to an invalid value specified on the "_id" variable.
            error.path === "_id" &&
            error instanceof mongoose.CastError &&
            error.kind === "ObjectId"
          ) {
            return { ok: false, message: "Invalid Product Id" }; //Returning when the supplied search object contains an invalid product id value (invalid format).
          } else {
            return {
              //Return a general error when the retrieving of products is unsuccessful.
              ok: false,
              message: "Error When updating Product",
              error: error,
            };
          }
        });
    } else {
      return {
        //Returns unsuccessful object and message when productId and productData argument are not defined.
        ok: false,
        message: "Update Product Requires both a product id and product data",
      };
    }
  } catch {
    return { ok: false, message: "Unknown Error when Updating Product" }; // Returning when Unknown error is thrown while executing this functions code.
  }
}

module.exports = updateProduct;
