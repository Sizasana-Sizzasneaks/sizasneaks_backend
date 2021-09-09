const shippingAddress = {
    // customers shipping address, can have more than one address
    addressLineOne: String,
    addressLineTwo: String,
    // customers city location 
    city: String,
    // customers province 
    province: String,
    // customers country location
    country: String,
    // customer zip code
    zipCode: String,
    // customers contact number or can be the receivers end contact detail e.g aunt, mother etc
    contactNumber: String
  };
  
  module.exports = shippingAddress;