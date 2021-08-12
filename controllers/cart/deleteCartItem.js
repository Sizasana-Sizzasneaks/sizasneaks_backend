const deleteCartItemById = require("./functions/deleteCartItemById.js");

const deleteCartItem = async function (req, res, next){
    console.log("Delete Cart Item Main Function")
    
    var deleteResult = await deleteCartItemById(req.params.productId);
    res.send(deleteResult);
}

module.exports = deleteCartItem;