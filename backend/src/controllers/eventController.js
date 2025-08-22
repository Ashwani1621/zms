const Event = require('../models/Event');
const asyncHandler = require('../middlewares/async');

exports.list = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

exports.create = asyncHandler(async (req, res) => {
  const doc = await Event.create(req.body);
  res.status(201).json(doc);
});

exports.update = asyncHandler(async (req, res) => {
  const doc = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: 'Event not found' });
  res.json(doc);
});

exports.remove = asyncHandler(async (req, res) => {
  const doc = await Event.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Event not found' });
  res.json({ message: 'Deleted' });
});
