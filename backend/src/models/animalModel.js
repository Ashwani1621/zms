const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An animal must have a name'],
        trim: true,
    },
    species: {
        type: String,
        required: [true, 'Species is required'],
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Unknown'],
        required: true,
    },
    habitat: {
        type: String,
        required: [true, 'Habitat information is required'],
    },
    diet: {
        type: String,
        required: [true, 'Diet information is required'],
    },
    healthStatus: {
        type: String,
        enum: ['Healthy', 'Sick', 'Under Observation'],
        default: 'Healthy',
    },
    medicalHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecord'
    }],
    isAdoptable: {
        type: Boolean,
        default: false,
    },
    imageUrl: {
        type: String,
        default: 'default-animal.jpg',
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

animalSchema.virtual('age').get(function() {
    if (!this.dateOfBirth) return 'Unknown';
    const ageDifMs = Date.now() - this.dateOfBirth.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;