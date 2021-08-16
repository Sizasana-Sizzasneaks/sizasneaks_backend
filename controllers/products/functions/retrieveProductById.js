const retrieveProducts = require("./retrieveProducts.js");

async function retrieveProductById(userCredential, productId) {
  var projection;

  if (userCredential === "administrator") {
    //Checking if user credential is set to administrator.
    projection = {}; //Sets projection (information) to return all information on the product if the credential is set to "administrator".
  } else {
    //Sets projection (information) to return only specific fields if the credential is not "administrator".
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

  //Sends search object and projection to another function to source the product/inventory item.
  var retrieveProductsResult = await retrieveProducts(
    { _id: productId },
    projection
  );
  //Returns the results of the search above.
  return retrieveProductsResult;
}

module.exports = retrieveProductById;
