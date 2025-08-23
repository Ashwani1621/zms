const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/error');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/animals', require('./routes/animalRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/adoptions', require('./routes/adoptionRoutes'));
app.use('/api/auth', require('./routes/authRoutes')); // simple admin auth

// Errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on :${PORT}`));
