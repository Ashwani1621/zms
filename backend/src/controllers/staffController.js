const Staff = require('../models/Staff');
const asyncHandler = require('../middlewares/async');

exports.list = asyncHandler(async (req, res) => {
  const staff = await Staff.find().populate('assignedAnimal');
  res.json(staff);
});

exports.create = asyncHandler(async (req, res) => {
  const doc = await Staff.create(req.body);
  res.status(201).json(doc);
});

exports.update = asyncHandler(async (req, res) => {
  const doc = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: 'Staff not found' });
  res.json(doc);
});

exports.remove = asyncHandler(async (req, res) => {
  const doc = await Staff.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Staff not found' });
  res.json({ message: 'Deleted' });
});
