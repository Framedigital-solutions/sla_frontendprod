// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brown: ["'Brown'", "sans-serif"], 
        garamond: ["'EB Garamond'", "serif"],
      },
      colors: {
        brown: {
          900: '#5D4037',
          800: '#6D4C41',
          700: '#795548',
        },
      },
    },
  },
  plugins: [],
};
