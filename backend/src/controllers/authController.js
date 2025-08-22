const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

// For speed: simple bootstrap admin creator (no hashing for demo; you can add bcrypt easily)
exports.seedAdmin = asyncHandler(async (req, res) => {
  const { name = 'Admin', email = 'admin@zoo.com', password = 'admin123' } = req.body || {};
  const exists = await User.findOne({ email });
  if (exists) return res.json({ message: 'Admin already exists.' });

  const user = await User.create({ name, email, passwordHash: password, role: 'admin' });
  res.status(201).json({ message: 'Admin created', user: { id: user._id, email: user.email } });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u || u.passwordHash !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '2d' });
  res.json({ token, user: { id: u._id, name: u.name, email: u.email, role: u.role } });
});
