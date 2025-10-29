# Frontend

This is the React frontend for the booking app. Pretty standard setup with TypeScript and TailwindCSS.

## Running it

```bash
npm install
```

Make a `.env.local` file:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open http://localhost:5173 and you're good to go.

## What's Inside

- **Home** - Grid of experiences with search
- **Details** - Shows experience info, date/time picker
- **Checkout** - Form for booking info
- **Result** - Confirmation or error page

All the components are in `src/components`, pages in `src/pages`. TypeScript types are in `src/types`.

## Building

```bash
npm run build
```

Output goes to `dist/` folder.

## Deploy

Works great on Vercel. Just point it to this folder and set the `VITE_API_URL` environment variable to your backend.
