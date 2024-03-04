/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '!sm': { 'raw': '(max-width: 640px)' },
        "!md": { 'raw': '(max-width: 768px)' },
        "!lg": { 'raw': '(max-width: 1024px)' },
        "3xl": { 'raw': '(min-width: 1780px)' }

      }
    }
  },
  plugins: [],
}

