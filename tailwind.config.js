/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["unb-pro", "sans-serif"],
      },
      backgroundColor: {
        'blue-brand': '#0087C8',
      },
      textColor: {
        'blue-brand': '#0087C8',
      },
    },
    plugins: [],
  }
}
