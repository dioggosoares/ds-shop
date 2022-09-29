import { styled } from '..'

export const NavigationWrapper = styled('main', {
  position: 'relative',
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw + ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const HomeContainer = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const ProductContainer = styled('div', {
  display: 'flex',
  // gap: '3rem',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, $primary200 0%, $secondary500 100%)',
  borderRadius: 8,
  // padding: '0 5rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  ing: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      gap: '0.5rem',

      strong: {
        fontSize: '$lg',
      },

      span: {
        fontSize: '$xl',
        color: '$primary300',
        fontWeight: 'bold',
      },
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0)',
      opacity: 1,
      transition: 'all 0.2s ease-in-out',
    },
  },
})

export const ButtonBag = styled('div', {
  backgroundColor: '$primary500',
  border: 'none',
  borderRadius: 6,
  padding: '0.75rem',
  cursor: 'pointer',
  color: '$gray100',
})
