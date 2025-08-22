const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { notFound, errorHandler } = require('./src/middlewares/error');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/animals', require('./src/routes/animalRoutes'));
app.use('/api/staff', require('./src/routes/staffRoutes'));
app.use('/api/tickets', require('./src/routes/ticketRoutes'));
app.use('/api/events', require('./src/routes/eventRoutes'));
app.use('/api/adoptions', require('./src/routes/adoptionRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes')); // simple admin auth

// Errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on :${PORT}`));
