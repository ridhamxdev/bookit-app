import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import experiencesRouter from './routes/experiences';
import bookingsRouter from './routes/bookings';
import promoRouter from './routes/promo';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promo', promoRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'BookIt API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to BookIt API',
    version: '1.0.0',
    endpoints: {
      experiences: '/api/experiences',
      bookings: '/api/bookings',
      promo: '/api/promo/validate',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ API available at http://localhost:${PORT}/api`);
});

export default app;

