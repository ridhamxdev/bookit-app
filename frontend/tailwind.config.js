/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F4D03F',
          50: '#fef9e7',
          100: '#fdf3cf',
          200: '#fbe89f',
          300: '#f9dc6f',
          400: '#f7d04f',
          500: '#F4D03F',
          600: '#f0c419',
          700: '#d4a017',
          800: '#a67c00',
          900: '#785800',
        },
      },
    },
  },
  plugins: [],
}

