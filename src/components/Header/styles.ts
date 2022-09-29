import { styled } from '../../styles'

export const HeaderApp = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  zIndex: 100,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CartBadge = styled('button', {
  backgroundColor: '$gray800',
  border: 'none',
  borderRadius: 6,
  padding: '0.625rem',
  color: '$gray700',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    color: '$gray300',
    transition: 'all 0.2s ease-in-out',
  },
})
