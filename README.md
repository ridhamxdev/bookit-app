# Highway Delite - Travel Experience Booking Platform

Hey! This is a booking platform for travel experiences across India. Built it as part of a fullstack assignment.

## What's This?

It's a web app where you can browse different travel experiences (kayaking, sunrise treks, etc.), pick a date and time slot, and book them. Pretty straightforward stuff.

The frontend is React with TypeScript and TailwindCSS, backend is Node.js with Express and MongoDB. Everything works end-to-end.

## Quick Setup

**You'll need:**
- Node.js (v16 or higher)
- MongoDB (either local or a free Atlas account)

**Getting it running:**

```bash
# Clone and get into the folder
git clone <your-repo-url>
cd bookit-app

# Backend setup
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookit
NODE_ENV=development
```

If you're using MongoDB Atlas instead of local, just swap the MONGODB_URI with your connection string.

```bash
# Add some sample data
npm run seed

# Start the backend
npm run dev
```

Open a new terminal for the frontend:

```bash
cd frontend
npm install
```

Create `.env.local` in the frontend folder:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
# Start it up
npm run dev
```

That's it. Go to http://localhost:5173 and you should see everything working.

## How It Works

**Home Page** - Shows all the experiences in a grid. There's a search bar if you want to find something specific.

**Details Page** - Click any experience to see more info. Pick a date, choose a time slot, adjust quantity with the +/- buttons.

**Checkout** - Enter your name and email. You can add a promo code if you want a discount.

**Confirmation** - Get a booking ID after confirming. Simple as that.

## Promo Codes

Try these if you want:
- `SAVE10` - 10% off
- `FLAT100` - ₹100 off
- `WELCOME20` - 20% off
- `FIRSTBOOK` - ₹50 off first booking

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast builds
- TailwindCSS for styling
- React Router for pages
- Axios for API calls

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- TypeScript
- CORS enabled

## API Endpoints

```
GET  /api/experiences          - List all experiences
GET  /api/experiences/:id      - Get one experience
POST /api/bookings             - Create a booking
POST /api/promo/validate       - Check if promo code works
```

## Project Structure

```
backend/
  ├── src/
  │   ├── models/       # MongoDB schemas
  │   ├── routes/       # API routes
  │   ├── config/       # Database connection
  │   └── seed.ts       # Sample data

frontend/
  ├── src/
  │   ├── components/   # Reusable stuff
  │   ├── pages/        # Main pages
  │   ├── services/     # API calls
  │   └── types/        # TypeScript types
```

## Deploying This

**Backend** - Works on Render, Railway, or Heroku. Just set your MongoDB URI in the environment variables.

**Frontend** - Vercel is easiest. Just point it to the frontend folder and set `VITE_API_URL` to your backend URL.

**Database** - MongoDB Atlas has a free tier that's perfect for this. Takes 5 minutes to set up.

## Features

- Search experiences by name or location
- Real-time slot availability (shows how many spots left)
- Sold out slots are disabled
- Form validation on checkout
- Promo code system
- Responsive design works on mobile
- Animations and hover effects throughout

## A Few Notes

The Indian Rupee (₹) is used throughout since all the experiences are in India. Times are in IST.

I seeded the database with 8 experiences - kayaking in Udupi, Nandi Hills sunrise trek, coffee plantation tours in Coorg, etc. All using real locations and reasonable pricing.

The slot system prevents double-booking. If someone books a slot before you, it'll show as sold out.

## Common Issues

**MongoDB won't connect?**
- If using local MongoDB, make sure the service is running
- If using Atlas, check your IP whitelist and connection string

**Port already in use?**
- Backend: Change the PORT in .env
- Frontend: Vite will suggest another port automatically

**No experiences showing up?**
- Run `npm run seed` in the backend folder again

## License

MIT - do whatever you want with it.

---

Built for a fullstack developer assignment. The design follows the Highway Delite branding with yellow accents and clean UI.
