const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    events: [{
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        isUsed: {
            type: Boolean,
            default: false
        }
    }],
    ticketType: {
        type: String,
        enum: ['Adult', 'Child', 'Senior'],
        required: true,
    },
    visitDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qrCodeId: {
        type: String,
        required: true,
        unique: true,
    },
    isZooAccessUsed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;