/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        "lexend-deca": ["Lexend Deca", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#0079FF",
      },
      width: {
        86: "360px",
      },
      maxWidth: {
        1080: "1280px",
      },
    },
  },
  plugins: [],
};
