const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

 
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  
  if (email === adminEmail && password === adminPassword) {
    
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2d' });
    
    
    res.json({
      token,
      user: { email: adminEmail, role: 'admin' }
    });
  } else {
    
    res.status(401).json({ message: 'Invalid credentials' });
  }
};