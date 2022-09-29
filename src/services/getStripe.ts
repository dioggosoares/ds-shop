import { loadStripe } from '@stripe/stripe-js'

export const getStripe = async () => {
  const stripePromise = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? '',
  )
  if (!stripePromise) {
    return stripePromise
  }
}
