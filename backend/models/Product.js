// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  image: { type: String, required: true },
  categories: { type: [String], default: [] }  // This line must be present!
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
