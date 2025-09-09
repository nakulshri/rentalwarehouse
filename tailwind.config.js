/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        classywhite: '#D7D4D9',
        classyblack: '#000000',
        classygray: '#63585E',
        classylavender: '#998DA0',
      },
      borderRadius: {
        DEFAULT: '0.125rem', // Reduce default rounding
        sm: '0',
        md: '0.125rem',
        lg: '0.25rem',
        xl: '0.25rem',
        '2xl': '0.25rem',
        '3xl': '0.25rem',
        full: '0.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
