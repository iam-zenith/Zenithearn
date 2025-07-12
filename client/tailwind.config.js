/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0847A8',    // Bitbucket dark blue
          default: '#0166FF', // Bitbucket primary blue
          light: '#4C9AFF',   // Bitbucket accent blue
          mild: '#B3D4FF',    // Soft background blue
        },
        accent: '#4C9AFF',       // Can be reused as accent
        background: '#DFECFF',   // Main background (optional use)
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
