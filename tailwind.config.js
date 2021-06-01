module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          base: 'black',
          light: '#262626',
          faded: '#00000059'
        },
        blue: {
          medium: '#0095F6',
          fb: '#3B5487',
        },
        gray: {
          base: '#616161',
          background: '#fafafa',
          primary: '#dbdbdb',
          secondary: '#8E8E8E',
        },
        red: {
          primary: '#ed4956',
        },
      },
      fontSize: {
        xxs: '0.7rem'
      }
    },
    fill: theme => ({
      'red': theme('colors.red.500'),
      'green': theme('colors.green.500'),
      'blue': theme('colors.blue.500'),
    })
  },
  variants: {
    extend: {
      opacity: ['active'],
      textAlign: ['focus'],
      display: ['group-hover'],
    },
  },
  plugins: [],
}
