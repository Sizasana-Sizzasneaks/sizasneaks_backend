const {
  QUANTITY_CHANGE_MODES,
} = require("../../constants/quantityChangeModes.js");
const deleteOrderItem = require("./deleteOrderitem.js");
const retrieveProducts = require("../../products/functions/retrieveProducts.js");
const changeProductOptionQuantity = require("../../products/functions/changeProductOptionQuantity.js");
const createOrderItem = require("../functions/createOrderItem.js");

async function constructOrderItem(productId, productOption, quantity) {
  return new Promise(async (resolve, reject) => {
    try {
      var quantityDropped = false;
      var orderItemCreated = false;
      if (
        typeof productId !== "undefined" &&
        typeof productOption !== "undefined" &&
        typeof quantity !== "undefined"
      ) {
        var changeProductOptionQuantityResult =
          await changeProductOptionQuantity(
            productId,
            productOption.color,
            productOption.size,
            quantity,
            QUANTITY_CHANGE_MODES.DECREMENT
          );

        if (changeProductOptionQuantityResult.ok) {
          quantityDropped = true;
          // Get Product Price Data

          var retrieveProductsResult = await retrieveProducts(
            {
              _id: productId,
            },
            {
              productName:1,
              supplierTaxAmount: 1,
              supplierCost: 1,
              sellingPriceTaxAmount: 1,
              sellingPrice: 1,
            }
          );

          if (retrieveProductsResult.ok) {
            var productDetails = retrieveProductsResult.data[0];

            if (String(productDetails._id) !== String(productId)) {
              throw "Failed to retrieve product.";
            }

            // Lets Create an Order Item

            var createOrderItemResult = await createOrderItem({
              productName: productDetails.productName,
              productId: productId,
              option: {
                color: productOption.color,
                size: productOption.size,
              },
              quantity: quantity,
              totalSupplierCost: productDetails.supplierCost,
              supplierTaxAmount: productDetails.supplierTaxAmount,
              sellingTaxAmount: productDetails.sellingPriceTaxAmount,
              sellingPriceAmount: productDetails.sellingPrice,
            });

            if (createOrderItemResult.ok) {
              orderItemCreated = true;
              resolve(createOrderItemResult);
            } else {
              console.log(createOrderItemResult);
              throw "Failed to create order item.";
            }
          } else {
            throw "Failed to retrieve product.";
          }
        } else {
          reject(changeProductOptionQuantityResult);
        }
      } else {
        reject({
          ok: false,
          message: "Error: constructOrderItem contains undefined argument(s)",
        });
      }
    } catch (error) {
      console.log("Error when constructing order item");
      console.log(error);
      if (quantityDropped) {
        var reverseProductOptionQuantityResult =
          await changeProductOptionQuantity(
            productId,
            productOption.color,
            productOption.size,
            quantity,
            QUANTITY_CHANGE_MODES.INCREMENT
          );
        if (reverseProductOptionQuantityResult.ok) {
          console.log("Cleaned Quantity Drop");
        }
      }

      if (orderItemCreated) {
        var deleteOrderItemResult = await deleteOrderItem(
          createOrderItemResult.data
        );
        if (deleteOrderItemResult.ok) {
          console.log("Cleaned Order Item Creation");
        }
      }
      reject({
        ok: false,
        message: "Unexpected error when constructing an order item.",
      });
    }
  });
}

module.exports = constructOrderItem;
