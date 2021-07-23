const mongoose = require('mongoose');


// Product  Schema
const Product = mongoose.model('Product', {
    id: {
        type: String,
        required:true
    },
    prodName: {
        type: String,
        required:true
    }, 
    prodDescription: {
        type:String,
        required:true
    },
    brand: {
        type:String,
        required:true
    },
    options: {
        //import from seperate option schema 
        type:String,
        required:true
    },
    imagURLs: {
        //from image collection
        type:String,
        required:true
    },
    showProduct: {
        type:Boolean,
        required:true
    },
    supplierTaxAmount: {
        type:Number,
        required:true
    },
    supplierCost: {
        type:Number,
        required:true
    },
    sellingPriceTaxAmount: {
        type:Number,
        required:true
    },
    sellingPrice: {
        type:Number,
        required:true
    },
    applicableTax: {
        //from tax calculation schema??
        type:String,
        required:true
    },
});



module.exports = {Product}