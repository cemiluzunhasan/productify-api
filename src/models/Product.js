const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: '$',
    required: true
  },
  stock: {
    type: Number,
    default: 100
  },
  color: {
    type: String,
    default: null
  },
  material: {
    type: String,
    default: null
  },
  dimensions: {
    type: String,
    default: null
  },
  shade: {
    type: String,
    default: null
  },
  categories: [{
    type: String
  }]
});

var productModel = new mongoose.model('Product', productSchema);

module.exports = productModel;