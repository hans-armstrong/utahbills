/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      backgroundImage: { 
        hero: 'url("/src/assets/capitol.webp")',
        building: 'url("/src/assets/building.png")',
        womanandman: 'url("/src/assets/womanandmandiscusspolitics.jpg")'
      },
      fontFamily: {
        informa: ['informapro-cond', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

