const retrieveProducts = require("./retrieveProducts.js");

async function retrieveProductById(userCredential, productId) {
  var projection;

  if (userCredential === "administrator") {
    projection = {};
  } else {
    projection = {
      productName: 1,
      productDescription: 1,
      brand: 1,
      categories: 1,
      options: 1,
      imgURls: 1,
      sellingPrice: 1,
    };
  }

  var retrieveProductsResult = await retrieveProducts(
    { _id: productId },
    projection
  );

  return retrieveProductsResult;
}

module.exports = retrieveProductById;
