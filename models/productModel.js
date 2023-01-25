const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "can't be blank"]
  },
  word: {
    type: String,
    required: [true, "can't be blank"]
  },
  description: {
    type: String,
    required: [true, "can't be blank"]
  },
  // filepath: {
  //   type: String,
  //   required: true,
  // },
  pictures: {
    type: Array,
    required: true
  }
}, {minimize: false});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;