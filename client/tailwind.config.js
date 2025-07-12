/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#01296E',
          default: '#003689',
          light: '#4C9AFF',
          mild: '#B3D4FF',
        },
        accent: '#4C9AFF',       // Can be reused as accent
        text: {
          dark: '#0847A8',
          light: '#DFECFF',
        },
        warning: {
          light: '#fff3cd', // Preserved
          dark: '#e0a800',
        },
        success: {
          light: '#c8e6c9',
          dark: '#388e3c',
        },
        error: {
          light: '#ffcdd2',
          dark: '#d32f2f',
        },
      },
    },
  },
  plugins: [],
});
