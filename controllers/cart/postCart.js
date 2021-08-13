const mongoose = require("mongoose");

const ShoppingCartItem = require("../../models/Customer.js");
module.exports =function postCart(){

    this.item= [ShoppingCartItem];

    this.add = function(productName, product_id){
            var storedItem = this.item[product_id];

//if theres no stored item thenadd new one
            if(!storedItem) {
                storedItem = this.item[product_id] = {productName: productName, quantity: 0, price: 0};
            }
         //increase quantity
         storedItem.quantity++;
         storedItem.price = storedItem.productName.price * storedItem.quantity;
    //      this.totalquantity++;
    //      this.totalprice += storedItem.price;
     }

     this.generateArray = function(){
         var aa = [];

         for (var product_id in this.item){
             arr.push(this.item[product_id]);
         }
         return arr;
     }
    
}

module.exports = shoppingCartItem;












