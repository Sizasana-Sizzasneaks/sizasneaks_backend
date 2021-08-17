var { STATUS_CODE } = require("../constants/httpConstants.js");
const createCartItem = require("./functions/createCartItem.js");

//postCartItem functionality
const postCartItem = async function (req, res) {
  console.log("Post Cart Item");

  try {
    // check argument are not undefined
    if (typeof req.body.product_id !== "undefined"&& 
          typeof req.body.variant !== "undefined" ) {

      if (req.body.credential === "customer") {
        console.log(req.body);

        //passing the arguments that make up shopping cart model
        var createCartItemResult= await createCartItem(
          req.body.userId,
          req.body.product_id,
          req.body.variant
        );
        //depending on the function return value 
        //send a successful or error message
        if (createCartItemResult.ok === true) {
          res.status = STATUS_CODE.SUCCESS;
          res.send(createCartItemResult);
        } else {
          res.status = STATUS_CODE.UNAUTHORIZED;
          res.send(createCartItemResult);
        }
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          error: "Insufficient Credentials",
        });
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        error: "Insufficient Data Supplied",
      });
    }
  } catch {
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unknown Server Error" });
  }
};
module.exports = postCartItem;
