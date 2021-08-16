const retrieveProducts = require("./retrieveProducts.js");

async function retrieveProductsByCategory(userCredential, queryObject) {
  var search;
  var projection;
  if (
    //Checks that all function arguments are not undefined before execution.
    typeof queryObject.searchBy !== "undefined" &&
    typeof queryObject.value !== "undefined"
  ) {
    //All Query Fields Supplied
    //Building a mongoose search object from the search criteria supplied within the query object.
    if (userCredential === "administrator") {
      //Checking if the credential supplied is of type Administrator.
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
      //Setting Projection - When credential is set to Administrator.
      projection = {
        productName: 1,
        brand: 1,
        showProduct: 1,
        sellingPrice: 1,
      };
    } else { //When Credential is not of type administrator  - (Customer, Unknown)
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
     //Setting Projection - When credential is not set to Administrator.
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

    //Using the search and projection objects created we make a call to retrieve the corresponding products. 
    var retrieveProductsResult = await retrieveProducts(search, projection);

    //Returns the results of the search for the product. 
    return retrieveProductsResult;

  } else {
    //Not all Query Fields Supplied
    return {
      ok: false,
      message: "Query fields, 'searchBy and value' must be supplied",
    };
  }
}

module.exports = retrieveProductsByCategory;
