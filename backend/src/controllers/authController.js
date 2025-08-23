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

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }

  // Create new user (for demo, using plain text password - in production, use bcrypt)
  const user = await User.create({ 
    name, 
    email, 
    passwordHash: password, 
    role: 'staff' // default role for new signups
  });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' });
  res.status(201).json({ 
    token, 
    user: { id: user._id, name: user.name, email: user.email, role: user.role } 
  });
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
