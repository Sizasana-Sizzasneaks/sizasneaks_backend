function createOrderSearchObject(searchBy, value) {
  try {
    var output = {};
    switch (searchBy) {
      case "ORDERID":
        output = { _id: value };
        break;

      case "CANCELLED":
        output = { isCancelled: value };
        break;

      case "SHIPPED":
        output = { hasShipped: value };
        break;

      case "DELIVERED":
        output = { hasBeenDelivered: value };
        break;
        case "PAID":
        output = { paymentComplete: value };
        break;

      case "DATE":
        //Gets Current Date
        var currentDate = value;
        output = { createdAt: currentDate };
        break;
      case "ALL":
        output = {};
        break;
      default:
        return { ok: false, message: "Invalid SearchBy and value supplied" };
    }

    return { ok: true, data: output };
  } catch {
    return {
      ok: false,
      message: "Unexpected error when creating search query object",
    };
  }
}

module.exports = createOrderSearchObject;
