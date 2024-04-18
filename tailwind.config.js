/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
