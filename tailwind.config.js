/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "!sm": { 'raw': '(max-width: 640px)' },
        "!md": { 'raw': '(max-width: 768px)' },
        "!lg": { 'raw': '(max-width: 1024px)' },
        "3xl": { 'raw': '(min-width: 1780px)' }

      },
      colors: {
        "Music": "rgb(83, 86, 255)",
        "Movie": "rgb(55, 140, 231)",
        "Book": "rgb(103, 198, 227)",
        "Neutral": "rgb(75 85 99)",
        "Neutral-Mild": "rgb(107 114 128)",
        "Neutral-Strong": "rgb(31 41 55)",
      }
    }
  },
  plugins: [],
}

