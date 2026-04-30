/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azure-blue': 'rgb(59, 149, 234)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft-float': '0px 10px 20px rgba(59, 149, 234, 0.15)',
      }
    },
  },
  plugins: [
    require('tailwindcss-react-aria-components')
  ],
}
