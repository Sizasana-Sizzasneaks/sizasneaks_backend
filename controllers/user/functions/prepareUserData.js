function prepareUserData(data) {
  console.log(data);
  var output = data;
  if (data.firstName && data.lastName) {
    var firstName =
      data.firstName.substr(0, 1).toUpperCase() +
      data.firstName.substr(1, data.firstName.length);
    var lastName =
      data.lastName.substr(0, 1).toUpperCase() +
      data.lastName.substr(1, data.lastName.length);
    var displayName = firstName.substr(0, 1) + ". " + lastName;

    output = { ...data, firstName, lastName, displayName };
    
  }
  return output;

}

module.exports = prepareUserData;
