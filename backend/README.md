# Backend API

Express server with MongoDB for the booking system.

## Setup

```bash
npm install
```

Create `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookit
NODE_ENV=development
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

API will be at http://localhost:5000

## Routes

- `GET /api/experiences` - All experiences
- `GET /api/experiences/:id` - One experience
- `POST /api/bookings` - New booking
- `POST /api/promo/validate` - Check promo code

## Database

Using MongoDB with Mongoose. Two main collections:
- **experiences** - Travel experiences with slots
- **bookings** - User bookings

## Promo Codes

Hardcoded in `routes/promo.ts`:
- SAVE10, FLAT100, WELCOME20, FIRSTBOOK

## Deploy

Works on Render or Railway. Build with `npm run build`, start with `npm start`. Don't forget to set your MongoDB URI in the environment.
