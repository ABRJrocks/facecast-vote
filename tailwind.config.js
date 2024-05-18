/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "regal-blue": {
          50: "#eef9ff",
          100: "#ddf2ff",
          200: "#b3e7ff",
          300: "#6fd5ff",
          400: "#23c1ff",
          500: "#00a9ff",
          600: "#0087dd",
          700: "#006bb2",
          800: "#005a93",
          900: "#014b79",
          950: "#013a63",
        },
      },
    },
  },
  plugins: [],
};
