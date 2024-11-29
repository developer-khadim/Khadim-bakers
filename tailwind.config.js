/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bakery-primary': '#1b3f3f',       // Primary color for the bakery theme
        'bakery-secondary': '#4ECDC4',    // Secondary color
        'bakery-background': '#F7FFF7'    // Background color
      },
      fontFamily: {
        'bakery': ['Poppins', 'sans-serif'] // Custom font family
      },
    },
  },
  plugins: [],
};
