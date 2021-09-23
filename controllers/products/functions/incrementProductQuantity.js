const Product = require("../../../models/product.js");

async function incrementProductQuantity(
  productId,
  optionColor,
  variantSize,
  increment
) {
  try {
    if (
      typeof productId !== "undefined" &&
      typeof optionColor !== "undefined" &&
      typeof variantSize !== "undefined" &&
      typeof increment !== "undefined"
    ) {
      return Product.updateOne(
        {
          _id: productId,
          "options.color": optionColor,
          "options.variants.size": variantSize,
        },
        {
          $inc: {
            "options.$[optionsArrayDoc].variants.$[variantsArrayDoc].quantity":
              increment,
          },
        },
        {
          runValidators: true,
          arrayFilters: [
            { "optionsArrayDoc.color": optionColor },
            { "variantsArrayDoc.size": variantSize },
          ],
        }
      )
        .then((docs) => {
          return {
            ok: true,
            message: "Quantity Changed Successfully",
            data: docs,
          };
        })
        .catch((error) => {
          return { ok: false, message: "Quantity Change Failed" };
        });
    } else {
      return { ok: false, message: "Not all arguments were supplied." };
    }
  } catch {
    return {
      ok: false,
      message: "Unexpected error when incrementing product quantity.",
    };
  }
}

module.exports = incrementProductQuantity;
