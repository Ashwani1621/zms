

const mongoose = require('mongoose');

const ticketPriceSchema = new mongoose.Schema({
    ticketType: {
        type: String,
        enum: ['Adult', 'Child', 'Senior'],
        required: true,
        unique: true 
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const TicketPrice = mongoose.model('TicketPrice', ticketPriceSchema);
module.exports = TicketPrice;