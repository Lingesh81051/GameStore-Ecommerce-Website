// backend/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true, default: 0 },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
