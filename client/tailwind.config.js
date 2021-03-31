module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'base-primary': '#0070F3',
        'base-secondary': '#B1B8C7',
      },
      height: {
        'custom-large': '650px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
