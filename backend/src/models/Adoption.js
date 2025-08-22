const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema(
  {
    visitorName: { type: String, required: true },
    contact: { type: String },
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
    donationAmount: { type: Number, default: 0 },
    adoptionDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Adoption', adoptionSchema);
