/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-color": "#4b6e01",
      },
      fontFamily: {
        noto: ["'Noto Serif Variable', serif"],
      },
    },
  },
  plugins: [],
};
