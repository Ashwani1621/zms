const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'An event must have a title'],
    },
    description: {
        type: String,
        required: [true, 'An event must have a description'],
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    maxAttendees: {
        type: Number,
        min: 1,
        default: 50,
    },
    price: {
        type: Number,
        required: true,
        default: 0 // Default to 0 for free events
    },
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;