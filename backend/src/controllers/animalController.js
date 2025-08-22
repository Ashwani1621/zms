const Animal = require('../models/Animal');
const asyncHandler = require('../middlewares/async');

exports.list = asyncHandler(async (req, res) => {
  const animals = await Animal.find();
  res.json(animals);
});

exports.create = asyncHandler(async (req, res) => {
  const doc = await Animal.create(req.body);
  res.status(201).json(doc);
});

exports.update = asyncHandler(async (req, res) => {
  const doc = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: 'Animal not found' });
  res.json(doc);
});

exports.remove = asyncHandler(async (req, res) => {
  const doc = await Animal.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Animal not found' });
  res.json({ message: 'Deleted' });
});
