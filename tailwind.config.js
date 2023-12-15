/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["unb-pro", "sans-serif"],
      },
      backgroundColor: {
        "blue-brand": "#0087C8",
      },
      textColor: {
        "grey-brand": "#3c3c3b",
        "blue-brand": "#0087C8",
      },
    },
    plugins: [],
  },
};
