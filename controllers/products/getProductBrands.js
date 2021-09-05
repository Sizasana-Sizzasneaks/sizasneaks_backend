const retrieveProductsByCategory = require("./functions/retrieveProductsByCategory.js");
const getBrandsList = require("./functions/getBrandsList.js");

var { STATUS_CODE } = require("../constants/httpConstants.js");

const getProductBrands = async (req, res) => {
  console.log("Get Product Brands List");

  try {
    var retrieveProductsResult = await retrieveProductsByCategory(
      req.body.credential,
      { searchBy: "", value: "" }
    );

    if (retrieveProductsResult.ok === true) {
      var getBrandsListResult = getBrandsList(retrieveProductsResult.data);

      if (getBrandsListResult.ok) {
        res.statusCode = STATUS_CODE.SUCCESS; //Attaches Success Status Code to response object.
        res.send(getBrandsListResult); //Sends product retrieved.
      } else {
        res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
        res.send(getBrandsListResult);
      }
    } else {
      res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
      res.send(retrieveProductsResult); //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, error: "Unknown Server Error" });
  }
};
module.exports = getProductBrands;
