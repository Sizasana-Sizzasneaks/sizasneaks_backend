const retrieveProducts = require("./retrieveProducts.js");

async function retrieveProductsByCategory(userCredential, queryObject) {
  var search;
  var projection;
  if (
    typeof queryObject.searchBy !== "undefined" &&
    typeof queryObject.value !== "undefined"
  ) {
    // All Querry Fileds Supplied
    //Set Search

    switch (queryObject.searchBy) {
      case "CATEGORY":
        search = { categories: queryObject.value };

        break;
      case "SEARCH":
        search = { productName: queryObject.value };
        break;
      case "BRAND":
        search = { brand: queryObject.value };
        break;
      default:
        search = {};
        break;
    }

    if (userCredential === "administrator") {
      projection = {};
    } else {

      search = { ...search, showProduct: true, available: true };
      //Set Projection
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

    var retrieveProductsResult = await retrieveProducts(search, projection);

    return retrieveProductsResult;

  } else {
    //Not all Query Fileds Supplied
    return {
      ok: false,
      message: "Query fields, 'searchBy and value' must be supplied",
    };
  }
}

module.exports = retrieveProductsByCategory;