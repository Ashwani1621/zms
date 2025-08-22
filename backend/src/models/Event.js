const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // "15:00"
    location: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
