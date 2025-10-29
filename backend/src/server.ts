import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import experiencesRouter from './routes/experiences';
import bookingsRouter from './routes/bookings';
import promoRouter from './routes/promo';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Basic middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promo', promoRouter);

// Quick health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Highway Delite API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint - shows available routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Highway Delite Booking API',
    version: '1.0.0',
    endpoints: {
      experiences: '/api/experiences',
      bookings: '/api/bookings',
      promo: '/api/promo/validate',
      health: '/api/health'
    }
  });
});

// Catch-all error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ API available at http://localhost:${PORT}/api`);
});

export default app;

