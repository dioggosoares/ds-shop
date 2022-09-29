import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import Stripe from 'stripe'

import { SuccessProps } from '../../@types/Success'
import { stripe } from '../../services/stripe'

import { SuccessContainer } from '../../styles/pages/success'

export default function Success({
  customerName,
  product,
  products,
}: SuccessProps) {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <>
      <Head>
        <title>Compra efetuada! | D-Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <div className="flex-shrink-0">
          <div className="flex w-full items-center justify-center overflow-hidden -space-x-10">
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <Image
                    key={product.id}
                    src={product.images[0]}
                    width={140}
                    height={140}
                    alt=""
                    className="flex w-[8.75rem] h-[8.75rem] items-center justify-center rounded-full bg-product-gradient shadow-lg shadow-black/80"
                  />
                </div>
              )
            })}
          </div>
        </div>
        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>{product.totalPurchased}</strong> camisetas já está a caminho
          da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details!.name
  const totalPurchased = session.line_items!.data.length
  const product = session.line_items!.data[0].price!.product as Stripe.Product
  const products = session.line_items!.data.map((product) => {
    return product.price!.product
  })

  return {
    props: {
      customerName,
      products,
      product: {
        name: product.name,
        imageUrl: product.images,
        totalPurchased,
      },
    },
  }
}
