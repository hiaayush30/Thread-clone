/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily:{
        kodeMono: ['Kode Mono', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

