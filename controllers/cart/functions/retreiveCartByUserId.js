const retrieveUserDetails= require("../../user/functions/retrieveUserDetails");

async function retrieveCartByUserId(userId){
    try {
        // checks that the argument is not undefined
        if (typeof userId !== "undefined") {
           var retrieveUserDetailsResult= await retrieveUserDetails(userId,{
               cart:1,
               _id:0
           });
           // checks if user does have an existing cart object and send it
           if(retrieveUserDetailsResult.ok=== true){
            
             return { ok: true, data: retrieveUserDetailsResult.data.cart  };
           }else
           {
               // send error message found in the retrieveUserDetails
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