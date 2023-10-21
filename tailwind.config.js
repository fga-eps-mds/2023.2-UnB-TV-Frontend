/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'blue-brand': '#0087C8',
      },
      textColor: {
        'blue-brand': '#0087C8',
      },
    },
  },
  plugins: [],
}