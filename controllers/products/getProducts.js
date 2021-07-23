const { Product } = require('../models/product');


const getProducts = async function (req, res, next) {
  console.log("Get Products Controller");
  try {
    const products = await Product.find({}, {__v: 0})
    res.send(products);
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = getProducts;