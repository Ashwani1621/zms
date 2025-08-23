const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    visitorName: { type: String, required: true },
    email: { type: String, required: true },
    visitDate: { type: Date, required: true },
    ticketCount: { type: Number, required: true, min: 1 },
    timeSlot: { type: String, enum: ['Morning', 'Afternoon'], required: true },
    ticketId: { type: String, unique: true, required: true },
    qrCode:  { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
