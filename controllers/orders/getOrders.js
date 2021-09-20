//Constants
var { STATUS_CODE } = require("../constants/httpConstants.js");
var { USER_CREDENTIAL } = require("../constants/userType.js");

//Helper Functions
const retrieveOrders = require("./functions/RetrieveOrders.js");
const createOrderSearchObject = require("./functions/createOrderSearchObject.js");

const getOrders = async function (req, res, next) {
  console.log("Get Orders");
  try {
    var search = {}; //Search object for retrieving order.
    var projection = {}; //Projection object for retrieving orders.
    if (req.body.credential === USER_CREDENTIAL.ADMINISTRATOR) {
      //When Admin Requests Order, they can get all orders.

      //Making sure search parameters were supplied in the query object of the request.
      if (
        typeof req.query.searchBy !== "undefined" &&
        req.query.value !== "undefined"
      ) {
        //Using query parameters supplied to generate search object that matches Mongoose Order Model.
        var createSearchQueryObjectResult = createOrderSearchObject(
          req.query.searchBy,
          req.query.value
        );

        if (createSearchQueryObjectResult.ok) {
          //Setting search object when creation of search object was successful.
          search = createSearchQueryObjectResult.data;
        } else {
          //Sending Error response when creation of search object was unsuccessful.
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send(createSearchQueryObjectResult);
          return;
        }
      } else {
        //Sending a response when search query parameters are not supplied.
        res.status = STATUS_CODE.BAD_REQUEST;
        res.send({
          ok: false,
          message:
            "searchBy and value properties not specified in request query object.",
        });
      }
    } else if (req.body.credential === USER_CREDENTIAL.CUSTOMER) {
      //When Customer Requests Order, they only get their own Orders.
      search = { customer_id: req.body.userId }; //Set Search Object to only get Order that match customer ID.
    } else {
      //Returning if Credential Type is not of Customer or Administrator.
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        message: "Access Denied: Insufficient Credentials",
      });
      return;
    }
    //Performing retrieval of all orders made on the platform
    var retrieveOrdersResult = await retrieveOrders(search, projection);

    if (retrieveOrdersResult.ok) {
      //Sending response when retrieving orders is successful.
      res.status = STATUS_CODE.SUCCESS;
      res.send(retrieveOrdersResult);
    } else {
      //Sending a response when getting orders failed.
      res.status = STATUS_CODE.BAD_REQUEST;
      res.send(retrieveOrdersResult);
    }
  } catch (error) {
    //Execution when unexpected error occurs when retrieving an order.
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; //Attaches Internal Error Status Code to response object.
    res.send({ ok: false, error: "Unknown Server Error" }); //Sending back a failure response due to an unexpected error being thrown.
  }
};
module.exports = getOrders;
