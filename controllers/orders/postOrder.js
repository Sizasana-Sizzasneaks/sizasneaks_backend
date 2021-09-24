const { USER_CREDENTIAL } = require("../constants/userType.js");
const {
  QUANTITY_CHANGE_MODES,
} = require("../constants/quantityChangeModes.js");
const retrieveCartByUserId = require("../cart/functions/retreiveCartByUserId.js");
const prepareCartData = require("../cart/functions/prepareCartData.js");
const constructOrderItem = require("./functions/constructOrderItem.js");
const createOrder = require("./functions/createOrder.js");
const retrieveShippingAddressById = require("../shippingAddress/functions/retrieveShippingAddressById.js");
const clearUserCart = require("../cart/functions/clearUserCart.js");
const { STATUS_CODE } = require("../constants/httpConstants.js");

const postOrder = async function (req, res) {
  try {
    console.log("Post Order Controller");
    if (req.body.credential === USER_CREDENTIAL.CUSTOMER) {
      if (typeof req.body.shippingId !== "undefined") {
        // Get Shipping Address
        var retrieveShippingAddressByIdResult =
          await retrieveShippingAddressById(
            req.body.userId,
            req.body.shippingId
          );

        if (retrieveShippingAddressByIdResult.ok) {
          var orderAddress =
            retrieveShippingAddressByIdResult.data.shippingAddresses[0];

          //Retrieve User Cart
          var retrieveCartByUserIdResult = await retrieveCartByUserId(
            req.body.userId
          );

          if (retrieveCartByUserIdResult.ok) {
            //Prepare Cart Data
            var prepareCartDataResult = await prepareCartData(
              retrieveCartByUserIdResult.data
            );
            if (prepareCartDataResult.ok === true) {
              //Check that all Products are available
              for (var x = 0; x < prepareCartDataResult.data.length; x++) {
                if (!prepareCartDataResult.data[x].available) {
                  res.status = STATUS_CODE.BAD_REQUEST;
                  res.send({
                    ok: false,
                    message:
                      "Some of your shopping cart items are not available. Please make changes to your cart and try placing an order again.",
                  });
                  return;
                }
              }

              //If all Products are available Proceed to create order Items.
              var createOrderItems = await Promise.all(
                prepareCartDataResult.data.map((item) =>
                  constructOrderItem(
                    item.product_id,
                    item.option,
                    item.quantity
                  )
                )
              )
                .then((orderItems) => {
                  return {
                    ok: true,
                    message: "OrderItems Created",
                    data: orderItems,
                  };
                })
                .catch((error) => {
                  return { ok: false, message: "Failed to Place Order" };
                });

              if (createOrderItems.ok) {
                //Prepare order items for order
                var arrayOfOrderItemId = createOrderItems.data.map(
                  (item) => item.data
                );

                //Create Order
                var createOrderResult = await createOrder({
                  customer_id: req.body.userId,
                  orderItems: arrayOfOrderItemId,
                  shippingAddress: orderAddress,
                  shippingCost: 60,
                  paymentComplete: false,
                  hasShipped: false,
                  hasBeenDelivered: false,
                  isCancelled: false,
                });

                if (createOrderResult.ok) {
                  //Clear Cart

                  var clearUserCartResult = await clearUserCart(
                    req.body.userId
                  );

                  res.status = STATUS_CODE.SUCCESS;
                  res.send(createOrderResult);
                } else {
                  res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                  res.send(createOrderResult);
                }
              } else {
                res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                res.send(createOrderItems);
              }
            } else {
              res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
              res.send(prepareCartDataResult);
            }
          } else {
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(retrieveCartByUserIdResult);
          }
        } else {
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send(retrieveShippingAddressByIdResult);
        }
      } else {
        res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
        res.send({
          //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
          ok: false,
          message: "Please provide a shipping addressId value",
        });
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        message: "Access Denied: Insufficient Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    // Sending a response when an unknown error occurs during execution.
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; // Attaching an Internal Server Error Status code to the response object.
    res.send({ ok: false, message: "Unknown Server Error" });
  }
};

module.exports = postOrder;
