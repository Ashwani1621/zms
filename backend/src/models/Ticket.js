const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    visitorName: { type: String, required: true },
    ticketType: { type: String, enum: ['Adult', 'Child', 'Senior', 'Group'], required: true },
    visitDate: { type: Date, required: true },
    timeSlot: { type: String, enum: ['Morning', 'Afternoon'], required: true },
    ticketId: { type: String, unique: true, required: true },
    qrCode: { type: String } // optional: base64/URL (add later if you like)
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
