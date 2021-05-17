module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          medium: '#0095F6',
          fb: '#3B5487',
        },
        black: {
          light: '#005c98',
          faded: '#00000059',
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
      }
    }
  },
  variants: {
    extend: {
      opacity: ['active'],
      textAlign: ['focus']
    },
  },
  plugins: [],
}