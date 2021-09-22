const checkFullCartAvailability = async function (cartItems) {
  try {
    var output = { ok: true };

    for (var x = 0; x < cartItems.length; x++) {
      if (!cartItems[x].available) {
        return { ok: false, message: "Not All cart items are availability" };
      }
    } 
  } catch (error) {
    return;
  }
};

module.exports = checkFullCartAvailability;
