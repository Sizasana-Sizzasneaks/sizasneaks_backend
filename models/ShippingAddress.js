const shippingAddress = {
    //human identifier for the address  (e.g school adr etc) 
    addressName: {
      type: String,
      required: true,
    },
    // customers shipping address, can have more than one address
    addressLineOne: {//street
      type: String,
      required: true,
    },
    //suburb
    addressLineTwo: {
      type: String,
      required: true,
    },
    // customers city location 
    city: {
      type: String,
      required: true,
    },
    // customers province 
    province: {
      type: String,
      required: true,
    },
    // customers country location
    country: {
      type: String,
      required: true,
    },
    // customer zip code
    zipCode: {
      type: String,
      required: true,
    },
    // customers contact number or can be the receivers end contact detail e.g aunt, mother etc
    contactNumber: {
      type: String,
      required: true,
    },
  };
  
  module.exports = shippingAddress;