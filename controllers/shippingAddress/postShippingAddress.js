// creating a specific shipping address
var { STATUS_CODE } = require("../constants/httpConstants.js");

// customer can have more than one shipping address
const createShippingAddress = require("./functions/createShippingAddress.js");

//postShippingAddress functionality
const postShippingAddress = async function (req, res) {
  console.log("Post Shipping Address");

  try {    
      //Checking if credential is set to customer, only a customer can add an shipping address.
      if (req.body.credential === "customer") {
        //Checking to see if the shipping address info supplied by the customer matches an existing shipping address.
        //Creating a new shipping address 
          var createShippingAddressResult = await createShippingAddress(
            req.body.userId,
            req.body.addressName,
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
            res.status = STATUS_CODE.BAD_REQUEST;
            res.send(createShippingAddressResult);
          }
        }
       else {
        //Sending back a unauthorized response when the user is not of type customer.
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          message: "Access Denied Insufficient Credentials",
        });
      } 
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, message: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};
module.exports = postShippingAddress;
