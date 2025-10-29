# BookIt: Experiences & Slots

A full-stack web application for booking travel experiences with slot management. Built with React + TypeScript + TailwindCSS on the frontend and Node.js + Express + MongoDB on the backend.

## 🌟 Features

- **Browse Experiences**: Explore curated travel experiences with detailed information
- **Slot Booking System**: Select dates and time slots with real-time availability
- **User-Friendly Checkout**: Streamlined booking process with form validation
- **Promo Code Support**: Apply discount codes for special offers
- **Responsive Design**: Mobile-first design that works on all devices
- **Booking Confirmation**: Detailed confirmation with booking ID

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel]
- **Backend API**: [Deployed on Render/Railway]
- **GitHub Repository**: [Your Repository URL]

## 📋 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- React Router (navigation)
- Axios (API calls)
- date-fns (date formatting)

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- CORS enabled
- RESTful API architecture

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Clone the Repository
```bash
git clone <your-repository-url>
cd bookit-app
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookit
NODE_ENV=development
```

For MongoDB Atlas (cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit?retryWrites=true&w=majority
```

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

For production:
```env
VITE_API_URL=https://your-backend-url.com/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
bookit-app/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ExperienceCard.tsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.tsx       # List all experiences
│   │   │   ├── Details.tsx    # Experience details & slot selection
│   │   │   ├── Checkout.tsx   # Booking form
│   │   │   └── Result.tsx     # Booking confirmation
│   │   ├── services/          # API service layer
│   │   │   └── api.ts
│   │   ├── types/             # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── models/            # Database models
│   │   │   ├── Experience.ts
│   │   │   └── Booking.ts
│   │   ├── routes/            # API routes
│   │   │   ├── experiences.ts
│   │   │   ├── bookings.ts
│   │   │   └── promo.ts
│   │   ├── config/            # Configuration files
│   │   │   └── database.ts
│   │   ├── server.ts          # Express server
│   │   └── seed.ts            # Database seeding script
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
│
└── README.md
```

## 🔌 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID

### Bookings
- `POST /api/bookings` - Create a new booking

### Promo Codes
- `POST /api/promo/validate` - Validate promo code

### Health Check
- `GET /api/health` - API health status

## 💳 Available Promo Codes

- `SAVE10` - 10% discount
- `FLAT100` - $100 flat discount
- `WELCOME20` - 20% welcome discount
- `FIRSTBOOK` - $50 first booking discount

## 🎨 Design & UI

The application features:
- Clean, modern interface
- Responsive design (mobile, tablet, desktop)
- Consistent color scheme and typography
- Loading states and error handling
- Form validation with clear feedback
- Intuitive user flow

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `VITE_API_URL`
4. Deploy

### Backend (Render/Railway)

#### Render
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables:
   - `PORT` (automatically set by Render)
   - `MONGODB_URI`
   - `NODE_ENV=production`

#### Railway
1. Create new project
2. Connect GitHub repository
3. Add MongoDB plugin or use Atlas
4. Set environment variables
5. Deploy

### Database (MongoDB Atlas)

1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Get connection string
5. Use in `MONGODB_URI`

## 📝 Usage Flow

1. **Home Page**: Browse available experiences with category filters
2. **Details Page**: View experience details, select date and time slot
3. **Checkout Page**: Enter customer information, apply promo code, review summary
4. **Result Page**: View booking confirmation or error message

## 🧪 Testing

To test the application:

1. Start both frontend and backend servers
2. Visit `http://localhost:5173`
3. Browse experiences
4. Select an experience and choose a slot
5. Fill in checkout form
6. Apply promo code (try `SAVE10`)
7. Complete booking
8. Verify confirmation

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongosh` or check Atlas connection
- Verify `.env` file exists with correct `MONGODB_URI`
- Run `npm run seed` to populate database

### Frontend API errors
- Ensure backend is running on correct port
- Verify `VITE_API_URL` in `.env.local`
- Check CORS is enabled on backend

### Database connection errors
- For local MongoDB: Start MongoDB service
- For Atlas: Check IP whitelist and credentials

## 🤝 Contributing

This is a fullstack intern assignment project. Contributions and feedback are welcome!

## 📄 License

ISC

## 👨‍💻 Author

Created as part of a fullstack developer intern assignment.

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Heroicons
- Inspiration from leading travel booking platforms

---

**Note**: This is a demonstration project for educational purposes. All experiences and data are fictional.

