/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/*.js",
    "./screens/*.js",
    "./global/*.js",
    "./routes/*.js",
    "./*.js",
  ],
  theme: {
    extend: {
      colors: {
        "custom-background": "#FFFFFF",
        "custom-main": "#47B8E0",
        "custom-secondary": "#134074",
        "custom-affirmation": "0BC11D",
        "custom-negation": "F26419",
      },
    },
  },
  plugins: [],
};
