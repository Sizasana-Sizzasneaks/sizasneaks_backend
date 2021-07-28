const  mongoose  = require("mongoose");
const Product = require("../../../models/product.js");

function retrieveProducts(search, projection) {
  return Product.find(search, projection)
    .then((docs) => {
      if (docs.length !== 0) {
        return { ok: true, data: docs };
      } else {
        return { ok: false, data: docs, message: "No product match found" };
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

module.exports = retrieveProducts;
