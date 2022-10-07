module.exports = {
  mode: 'jit',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'product-gradient': 'linear-gradient(#1ea483 0%, #7465d4 100%)',
      },
      colors: {
        graycustom: {
          100: '#e1e1e6',
          300: '#c4c4cc',
          730: '#737380',
          700: '#323238',
          800: '#202024',
          850: '#1f2729',
          870: '#171D1F',
          900: '#121414',
          950: '#0E1010',
          999: '#0C0D0D',
        },
        cyanis: {
          500: '#61dcfb',
        },
        gold: {
          300: '#FFC249',
          500: '#eba417',
        },
        primary: {
          500: '#00875f',
          300: '#00b37e',
          200: '#1ea483',
        },
      },
      fontFamily: {
        ubuntu: "'Ubuntu', sans-serif",
        roboto: "'Roboto', sans-serif",
        baloo: "'Baloo Bhai 2', cursive",
      },
      borderRadius: {
        '4xl': '3rem',
        '5xl': '4rem',
        '6xl': '5rem',
        smd: '0.25rem',
      },
      marginBottom: {
        4.5: '1.225rem',
      },
      maxWidth: {
        x: '12.5rem',
        xd: '15.938rem',
        '1/2': '37.5rem',
        '2/3': '45rem',
        '5/6': '70rem',
      },
      width: {
        '64/2': '16.5rem',
      },
      left: {
        'neg-5': '3.438rem',
      },
      fontSize: {
        '5/6': '3.5rem',
      },
      lineHeight: {
        '6/7': '1.625rem',
      },
      blur: {
        xs: '0.313rem',
      },
      screens: {
        '1xl': '1440px',
        '3xl': '1920px',
        mob: '425px',
      },
    },
  },
  plugins: [require('daisyui')],
}
