/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        "color-reddish" : "#B85042",
        "color-offwhite" : "#E7E8D1",
        "color-lightgreen" : "#A7BEAE"
      }
    },
  },
  plugins: [],
}

