# BookIt Frontend

React + TypeScript + TailwindCSS frontend for the BookIt experiences booking platform.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env.local file
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

Visit: http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, use your deployed backend URL.

## Features

- Browse experiences with filtering
- View detailed experience information
- Select dates and time slots
- Form validation
- Promo code support
- Responsive design
- Booking confirmation

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- date-fns

## Project Structure

```
src/
├── components/      # Reusable components
├── pages/          # Page components
├── services/       # API services
├── types/          # TypeScript types
├── App.tsx         # Main app
└── main.tsx        # Entry point
```

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for deployment instructions.
