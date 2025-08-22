const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    assignedAnimal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Staff', staffSchema);
