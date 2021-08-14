const mongoose = require("mongoose");
const Product = require("../../../models/product.js");
const retrieveProducts = require("./retrieveProducts.js");

async function createProduct(product) {
  console.log("create product here");
  if (typeof product !== "undefined") {
    var product = new Product(product);

    return product
      .save()
      .then(() => {
        return { ok: true, message: "product created" };
      })
      .catch((error) => {
        console.log(error);
        return { ok: false, message: "Failed To Create New product" };
      });
  } else {
    return { ok: false, message: "Product is undefined" };
  }
}

module.exports = createProduct;
