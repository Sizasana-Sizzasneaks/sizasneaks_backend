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

    if (userCredential === "administrator") {
      switch (queryObject.searchBy) {
        case "CATEGORY":
          search = { categories: queryObject.value };

          break;
        case "SEARCH":
          search = {
            productName: { $regex: queryObject.value, $options: "i" },
          };
          break;
        case "BRAND":
          search = { brand: queryObject.value };
          break;

        case "PRODUCTID":
          search = { _id: queryObject.value };
          break;
        case "VISIBILITY":
          search = { showProduct: queryObject.value };
          break;
        case "NEW":
          //Gets Current Date
          var currentDate = new Date();

          //Converts current date to exactly one month ago.
          currentDate.setMonth(currentDate.getMonth() - 1);

          search = { createdAt: { $gte: currentDate } };
          break;
        default:
          search = {};
          break;
      }

      projection = {
        productName: 1,
        brand: 1,
        showProduct: 1,
        sellingPrice: 1,
      };
    } else {
      switch (queryObject.searchBy) {
        case "CATEGORY":
          search = { categories: queryObject.value };

          break;
        case "SEARCH":
          search = {
            productName: { $regex: queryObject.value, $options: "i" },
          };
          break;
        case "BRAND":
          search = { brand: queryObject.value };
          break;

        default:
          search = {};
          break;
      }

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
