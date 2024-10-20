// models/Property.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  images: [String],  // Array of image URLs or paths
  sellerName: { type: String, required: true },
  sellerPhone: { type: String, required: true },
  sellerEmail: { type: String, required: true }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
