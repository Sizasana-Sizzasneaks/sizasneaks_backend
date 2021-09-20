var { STATUS_CODE } = require("../constants/httpConstants.js");
const createCartItem = require("./functions/createCartItem.js");
const matchCartItem = require("./functions/matchCartItem.js");
const updateCartItemQuantity = require("./functions/updateCartItemQuantity.js");

//postCartItem functionality
const postCartItem = async function (req, res) {
  console.log("Post Cart Item");

  try {
    //Checks that all function arguments are not undefined before execution.
    if (
      typeof req.body.product_id !== "undefined" &&
      typeof req.body.variant !== "undefined"
    ) {
      //Checking if credential is set to customer, only a customer can add an item to their shopping cart.
      if (req.body.credential === "customer") {
        //Checking to see if the cart item info supplied by the customer matches an item that is already in their cart.
        var matchCartItemResult = await matchCartItem(
          req.body.userId,
          req.body.product_id,
          req.body.variant
        );
        //Checking to see if the there was any cart item match.
        if (matchCartItemResult.ok === true) {
          //Raising the cart item's quantity if it already exists in the customers shopping cart.
          var quantity = matchCartItemResult.data.quantity;
          var newQuantity = quantity + 1;

          //Performing the Quantity update.
          var updateCartItemQuantityResult = await updateCartItemQuantity(
            req.body.userId,
            matchCartItemResult.data._id,
            newQuantity
          );
          //Checking if the quantity update was successful.
          if (updateCartItemQuantityResult.ok === true) {
            //Sending a corresponding success response.
            res.status = STATUS_CODE.SUCCESS;
            res.send(updateCartItemQuantityResult);
          } else {
            //Sending a corresponding failure response.
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(updateCartItemQuantityResult);
          }
        } else {
          //Creating a new Cart item if the customer does not have any matching cart item already in their cart.
          var createCartItemResult = await createCartItem(
            req.body.userId,
            req.body.product_id,
            req.body.variant
          );
          //Checking if Creating the new cart item was successful.
          if (createCartItemResult.ok === true) {
            //Sending back a corresponding success Response
            res.status = STATUS_CODE.SUCCESS;
            res.send(createCartItemResult);
          } else {
            //Sending back a corresponding failure Response
            res.status = STATUS_CODE.UNAUTHORIZED;
            res.send(createCartItemResult);
          }
        }
      } else {
        //Sending back a unauthorized response when the user is not of type customer.
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          message: "Insufficient Credentials",
        });
      }
    } else {
      //Sending back a Bad request response when not all data is supplied.
      res.status = STATUS_CODE.BAD_REQUEST;
      res.send({
        ok: false,
        message: "Insufficient Data Supplied",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, message: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};
module.exports = postCartItem;
