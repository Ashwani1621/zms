const mongoose = require('mongoose');

const staffProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
        required: [true, 'Job title is required'],
        enum: ['Zookeeper', 'Veterinarian', 'Ticket Agent', 'Manager', 'Administrator']
    },
    department: {
        type: String,
        enum: ['Animal Care', 'Veterinary Services', 'Guest Services', 'Administration'],
        required: true
    },
    hireDate: {
        type: Date,
        required: true
    },
    emergencyContact: {
        name: String,
        phone: String
    }
}, {
    timestamps: true
});

const StaffProfile = mongoose.model('StaffProfile', staffProfileSchema);
module.exports = StaffProfile;