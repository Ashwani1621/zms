const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, default: 0 },
    healthStatus: { type: String, default: 'Healthy' },
    enclosure: { type: String, required: true },
    url: { type: String }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Animal', animalSchema);
