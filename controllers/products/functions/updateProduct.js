const mongoose = require("mongoose");
const Product = require("../../../models/product.js");

async function updateProduct(productId, productData) {
  try {
    if (
      typeof productId !== "undefined" &&
      typeof productData !== "undefined" &&
      productData instanceof Object
    ) {
      return Product.updateOne({ _id: productId }, productData)
        .then(() => {
          console.log("Update Worked");
          return { ok: true, message: "fields Updated." };
        })
        .catch((error) => {
          console.log("Update Failed");
          if (
            error.path === "_id" &&
            error instanceof mongoose.CastError &&
            error.kind === "ObjectId"
          ) {
            return { ok: false, message: "Invalid Product Id" };
          } else {
            return {
              ok: false,
              message: "Error When updating Product",
              error: error,
            };
          }
        });
    } else {
      return {
        ok: false,
        message: "Update Product Requires both a product id and product data",
      };
    }
  } catch {
    return { ok: false, message: "Unkown Error when Updating Product" };
  }
}

module.exports = updateProduct;
