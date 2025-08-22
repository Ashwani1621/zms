const Adoption = require('../models/Adoption');
const asyncHandler = require('../middlewares/async');

exports.list = asyncHandler(async (req, res) => {
  const list = await Adoption.find().populate('animalId').sort({ createdAt: -1 });
  res.json(list);
});

exports.create = asyncHandler(async (req, res) => {
  const doc = await Adoption.create(req.body);
  res.status(201).json(doc);
});
