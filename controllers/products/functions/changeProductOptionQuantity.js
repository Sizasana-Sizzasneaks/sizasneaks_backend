const {
  QUANTITY_CHANGE_MODES,
} = require("../../constants/quantityChangeModes.js");
const Product = require("../../../models/product.js");

async function changeProductOptionQuantity(
  productId,
  optionColor,
  variantSize,
  value,
  mode
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        typeof productId !== "undefined" &&
        typeof optionColor !== "undefined" &&
        typeof variantSize !== "undefined" &&
        typeof value !== "undefined" &&
        typeof mode !== "undefined"
      ) {
        var getProductToUpdate = await Product.find(
          {
            _id: productId,
            "options.color": optionColor,
            "options.variants.size": variantSize,
          },
          {
            options: {
              $elemMatch: {
                color: optionColor,
                variants: { $elemMatch: { size: variantSize } },
              },
            },
          }
        )

          .then((docs) => {
            if (docs.length === 1) {
              return { ok: true, data: docs[0] };
            } else {
              return { ok: false, message: "No matching product option found" };
            }
          })
          .catch(() => {
            return {
              ok: false,
              message: "Failed to get matching product option",
            };
          });

        if (getProductToUpdate.ok) {
          var productToUpdate = getProductToUpdate.data;

          //Update Quantity
          var foundMatch = false;

          await productToUpdate.options[0].variants.forEach((variant) => {
            if (variant.size === variantSize) {
              foundMatch = true;
              if (mode === QUANTITY_CHANGE_MODES.INCREMENT) {
                variant.quantity = variant.quantity + value;
              } else if (mode === QUANTITY_CHANGE_MODES.DECREMENT) {
                variant.quantity = variant.quantity - value;
              }
            }
          });

          if (foundMatch) {
            productToUpdate
              .save()
              .then((doc) => {
                resolve({ ok: true, data: doc });
              })
              .catch((error) => {
                console.log(error);
                if (
                  error.errors["options.0.variants.0.quantity"].path ===
                    "quantity" &&
                  error.errors["options.0.variants.0.quantity"].kind === "min"
                ) {
                  resolve({
                    ok: false,
                    message: "Quantity not valid.",
                  });
                } else {
                  resolve({
                    ok: false,
                    message: "Error when saving document.",
                  });
                }
              });
          } else {
            resolve({ ok: false, message: "No matching product option found" });
          }
        } else {
          resolve(getProductToUpdate);
        }
      } else {
        resolve({ ok: false, message: "Not all arguments were supplied." });
      }
    } catch {
      resolve({
        ok: false,
        message: "Unexpected error when incrementing product quantity.",
      });
    }
  });
}

module.exports = changeProductOptionQuantity;
