// eslint-disable-next-line no-undef
const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bclight: "#FCF5ED",
        bcmedium: "#F4BF96",
        bcdark: "#CE5A67",
        bcblack: "#1F1717",
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {},
        },
        dark: {
          // ...
          colors: {},
        },
      },
    }),
  ],
}
