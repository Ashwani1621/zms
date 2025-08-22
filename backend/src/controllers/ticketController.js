const Ticket = require('../models/Ticket');
const asyncHandler = require('../middlewares/async');
const { genTicketId } = require('../utils/id');

exports.list = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
});

exports.create = asyncHandler(async (req, res) => {
  const payload = { ...req.body, ticketId: genTicketId() };
  const doc = await Ticket.create(payload);
  res.status(201).json(doc);
});
