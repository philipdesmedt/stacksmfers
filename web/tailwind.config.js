const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    'src/**/*.html',
    'src/**/*.tsx',
    'components/**/*.tsx',
    'public/html/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        headings: ['Pangolin', ...defaultTheme.fontFamily.sans],
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
