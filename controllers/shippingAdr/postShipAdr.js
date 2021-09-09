// creating a specific shipping address
var { STATUS_CODE } = require("../constants/httpConstants.js");

// customer can have more than one shipping address
const createShippingAdrArray = require("./functions/createShippingAddress.js");

//postShippingAddress functionality
const postShippingAddress = async function (req, res) {
  console.log("Post Shipping Address");

  try {
    //Checks that all function arguments are not undefined before execution.
    if (typeof req.body.userId !== "undefined" && 
          typeof req.body.city !== "undefined" ) {
      //Checking if credential is set to customer, only a customer can add an shipping address.
      if (req.body.credential === "customer") {
        //Checking to see if the shipping address info supplied by the customer matches an existing shipping address.
        //Creating a new shipping address 
          var createShippingAddressResult = await createShippingAddress(
            req.body.userId,
            req.body.addressLineOne,
            req.body.addressLineTwo,
            req.body.city,
            req.body.province,
            req.body.country,
            req.body.zipCode,
            req.body.contactNumber
          );
          //Checking if Creating the new cart item was successful.
          if (createShippingAddressResult.ok === true) {
            //Sending back a corresponding success Response
            res.status = STATUS_CODE.SUCCESS;
            res.send(createShippingAddressResult);
          } else {
            //Sending back a corresponding failure Response
            res.status = STATUS_CODE.UNAUTHORIZED;
            res.send(createShippingAddressResult);
          }
        }
       else {
        //Sending back a unauthorized response when the user is not of type customer.
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          error: "Insufficient Credentials",
        });
      } 
    } else {
      //Sending back a Bad request response when not all data is supplied.
      res.status = STATUS_CODE.BAD_REQUEST;
      res.send({
        ok: false,
        error: "Insufficient Data Supplied",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};
module.exports = postShippingAddress;
