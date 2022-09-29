import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: '#fff',

      gray900: '#121214',
      gray800: '#202024',
      gray700: '#8d8d89',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      primary500: '#00875f',
      primary300: '#00b37e',
      primary200: '#1ea483',

      secondary500: '#7465d4',
    },

    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },
})
