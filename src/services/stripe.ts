import Stripe from 'stripe'

const apiKey = process.env.STRIPE_SECRET_KEY ?? ''

export const stripe = new Stripe(apiKey, {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'Ignite Shop',
  },
})
