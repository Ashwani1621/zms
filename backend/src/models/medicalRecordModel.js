const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    veterinarian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visitDate: {
        type: Date,
        default: Date.now
    },
    diagnosis: {
        type: String,
        required: true
    },
    treatment: String,
    notes: String
}, { timestamps: true });

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
module.exports = MedicalRecord;