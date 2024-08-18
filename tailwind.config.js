/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6230",
        inactive: "#C6C1C1",
        blue: "#298CFF",
        green: "#01BC40",
        red: "#FF5656",
        grey: "#989898 ",
      },
      fontFamily: {
        plight: ["FiraCode-Light", "sans-serif"],
        pregular: ["FiraCode-Regular", "sans-serif"],
        pbold: ["FiraCode-Bold", "sans-serif"],
        pmedium: ["FiraCode-Medium", "sans-serif"],
        psemibold: ["FiraCode-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
