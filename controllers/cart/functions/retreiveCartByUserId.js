const retrieveUserDetails= require("../../user/functions/retrieveUserDetails");
const availableProduct=require("./functions/availabilityProduct.js");

// receieves user id and returns corresponding users cart
async function retrieveCartByUserId(userID){
    try {
        if (typeof userID !== "undefined") {
           var retrieveUserDetailsResult= await retrieveUserDetails(userId,{
               cart:1
           });
           if(retrieveUserDetailsResult.ok=== true){
             console.log(retrieveUserDetailsResult.data);
             return { ok: true, data: retrieveUserDetailsResult.data  };
           }else
           {
               return retrieveUserDetailsResult;
           }
        }
        else{
            return { ok: false, message: "User Id not supplied" };
        }
    }catch{
        return { ok: false, message: " internal Server Error" };
    }

}

module.exports = retrieveCartByUserUserId