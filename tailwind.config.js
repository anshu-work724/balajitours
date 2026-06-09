/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: { 50: '#f0fdfa', 100: '#ccfbf1', 300: '#5eead4', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
        orange: { 50: '#fff7ed', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c' }
      }
    },
  },
  plugins: [],
}
