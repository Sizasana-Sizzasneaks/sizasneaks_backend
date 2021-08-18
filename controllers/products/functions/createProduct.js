const Product = require("../../../models/product.js"); 

async function createProduct(product) {
  //Checks that all function arguments are not undefined before execution.
  if (typeof product !== "undefined") {
    var product = new Product(product); //Creates a product object from the supplied argument.

    return product
      .save() //Saves this new product object to persistent storage.
      .then(() => {
        return { ok: true, message: "product created" }; //Returns successful object and message when saving of a new product completes correctly.
      })
      .catch(() => {
        return { ok: false, message: "Failed To Create New product" }; //Returns unsuccessful object and message when saving of new product/inventory item fails.
      });
  } else {
    return { ok: false, message: "Product is undefined" }; //Returns unsuccessful object and message when product argument is not defined.
  }
}

module.exports = createProduct;
