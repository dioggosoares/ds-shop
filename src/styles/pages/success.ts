import { styled } from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: '41rem',

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
    marginTop: '3rem',
  },

  strong: {
    color: '$secondary500',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: '35rem',
    textAlign: 'center',
    margin: '1.5rem 0',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '4rem',
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$primary500',

    '&:hover': {
      color: '$primary300',
    },
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: '8.125rem',
  height: '9.0625rem',
  background: 'linear-gradient(180deg, $primary200 0%, $secondary500 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  ing: {
    objectFit: 'cover',
  },
})
