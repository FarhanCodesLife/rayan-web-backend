import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

import adminRoutes from './routes/admin.js';
import serviceRoutes from './routes/services.js';
import fleetRoutes from './routes/fleet.js';
import bookingRoutes from './routes/bookings.js';
import blogRoutes from './routes/blog.js';
import uploadRoutes from './routes/upload.js';
import settingsRoutes from './routes/settings.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// connect db
connectDB(process.env.MONGO_URI);

// routes
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);

// health
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));

// error
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
