# BookIt Backend

Node.js + Express + MongoDB backend API for the BookIt platform.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookit
NODE_ENV=development
EOF

# Seed database
npm run seed

# Start development server
npm run dev
```

API runs on: http://localhost:5000

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookit
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit
```

## API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID

### Bookings
- `POST /api/bookings` - Create new booking

### Promo Codes
- `POST /api/promo/validate` - Validate promo code

### Health
- `GET /api/health` - Health check

## Database Models

### Experience
- Title, description, location
- Price, duration, category
- Rating and reviews
- Available dates and slots
- Highlights and inclusions

### Booking
- Experience reference
- Customer information
- Date and slot selection
- Promo code and pricing
- Booking ID and status

## Promo Codes

- `SAVE10` - 10% discount
- `FLAT100` - $100 off
- `WELCOME20` - 20% discount
- `FIRSTBOOK` - $50 off

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- CORS enabled

## Project Structure

```
src/
├── models/         # Mongoose models
├── routes/         # API routes
├── config/         # Configuration
├── server.ts       # Express server
└── seed.ts         # Database seeding
```

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for deployment instructions.

