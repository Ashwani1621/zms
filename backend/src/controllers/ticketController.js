const Ticket = require('../models/Ticket');
const qrcode = require('qrcode'); 
const asyncHandler = require('../middlewares/async');
const { genTicketId } = require('../utils/id');

exports.create = asyncHandler(async (req, res) => {
  const { visitorName, email, ticketCount, visitDate, timeSlot } = req.body;

  

  if (!visitorName || !email || !ticketCount || !visitDate || !timeSlot) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all required ticket information.' 
    });
  }

  const ticketId = genTicketId();

  const payload = {
    visitorName,
    email,
    ticketCount,
    visitDate,
    timeSlot,
    ticketId,
    qrCode: await qrcode.toDataURL(ticketId),
  };

  const newTicket = await Ticket.create(payload);

  res.status(201).json(newTicket);
});

exports.list = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
});