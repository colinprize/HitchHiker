/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      "wheat": "#f3e4ac",
      "moss-green": "#acdca4",
      "desert-storm": "#f3f3f1",
      "sprout": "#b6d4a4",
      "beryl-green": "#d0e4b8",
      "olivine": "#95ba75",
      "pine-glade": "#b8d49c",
      "double-colonial-white": "#ece4a4",
      "moss-green-light": "#b4dca4",
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
