/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"EB Garamond"', 'ui-serif', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        graphite: {
          950: '#161719',
          900: '#1b1c1f',
          800: '#212327',
          700: '#2b2e33',
          600: '#3a3e44',
          500: '#565b62',
        },
        gold: {
          400: '#dcc28d',
          500: '#c8a86a',
          600: '#a98a4f',
        },
      },
    },
  },
  plugins: [],
}
