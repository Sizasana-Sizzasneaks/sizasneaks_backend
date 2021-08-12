// File purpose get productId check if availability is true
const  mongoose  = require("mongoose");
const Product = require("../../../models/product.js");

async function retrieveProductById(userCredential, productId) {
  var projection;

  if (userCredential === "administrator") {
    projection = {};
  } else {
    projection = {
        available:1
    };
  }

  // send to the retrieveProduct file to query find 
  // if product is available with the projection query

  return Product.find({product_id: productId}, projection)
    .then((docs) => {
      if (docs.length !== 0) {
        return { ok: true, data: docs };
      } else {
        return { ok: false, data: docs, message: "Product not available" };
      }
    })
    .catch((error) => {
      if (
        error.path === "_id" &&
        error instanceof mongoose.CastError &&
        error.kind === "ObjectId"
      ) {
        return { ok: false, message: "Invalid Product Id" };
      } else {
        return { ok: false, message: "Error When Getting Products" };
      }
    });
}

module.exports = retrieveProductById;

// const retrieveProducts = require("../../products/functions/retrieveProducts.js");
// var retrieveProductsResult = await retrieveProducts(
    //     { _id: productId },
    //     projection
    // );