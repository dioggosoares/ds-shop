import { NextApiRequest, NextApiResponse } from 'next'

import { stripe } from '../../services/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cartItems } = req.body

  if (!cartItems) {
    return res.status(400).json({ error: 'Items not found.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  if (req.method === 'POST') {
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        payment_method_types: ['card'],
        line_items: cartItems.map((item: any) => {
          return {
            price: item.defaultPriceId,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 99,
            },
            quantity: item.quantity,
          }
        }),
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
      })

      return res.status(201).json({
        checkoutUrl: checkoutSession.url,
      })
    } catch (err) {
      console.log(err)
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
