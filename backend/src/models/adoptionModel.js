const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true,
    },
    adoptionDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    donationAmount: {
        type: Number,
        required: [true, 'A donation amount is required for adoption'],
    },
}, {
    timestamps: true
});

const Adoption = mongoose.model('Adoption', adoptionSchema);
module.exports = Adoption;