const createError = require('http-errors');
const mongoose = require('mongoose');


const { Product } = require('../../models/Product.js');

const getSpecificProducts = async function (req, res, next) {
  console.log("Get All Products Controller");
  const id = req.params.id;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw createError(404, 'This product does not exist.');
    }
    res.send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Not a valid Product id'));
      return;
    }
    next(error);
  }
};
  module.exports = getSpecificProducts;