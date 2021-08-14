const retrieveUserDetails= require("../../user/functions/retrieveUserDetails");
// const availableProduct=require("./functions/availabilityProduct.js");

// receieves user id and returns corresponding users cart
async function retrieveCartByUserId(userId){
    try {
        if (typeof userId !== "undefined") {
           var retrieveUserDetailsResult= await retrieveUserDetails(userId,{
               cart:1,
               _id:0
           });
           if(retrieveUserDetailsResult.ok=== true){
             return { ok: true, data: retrieveUserDetailsResult.data.cart  };
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

module.exports = retrieveCartByUserId