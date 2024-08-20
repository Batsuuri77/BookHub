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
        flight: ["FiraCode-Light", "sans-serif"],
        fregular: ["FiraCode-Regular", "sans-serif"],
        fbold: ["FiraCode-Bold", "sans-serif"],
        fmedium: ["FiraCode-Medium", "sans-serif"],
        fsemibold: ["FiraCode-SemiBold", "sans-serif"],
        iblack: ["Inter_24pt-Black", "sans-serif"],
        ibold: ["Inter_24pt-Bold", "sans-serif"],
        iextrabold: ["Inter_24pt-ExtraBold", "sans-serif"],
        iextralight: ["Inter_24pt-ExtraLight", "sans-serif"],
        ilight: ["Inter_24pt-Light", "sans-serif"],
        imedium: ["Inter_24pt-Medium", "sans-serif"],
        iregular: ["Inter_24pt-Regular", "sans-serif"],
        isemibold: ["Inter_24pt-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
