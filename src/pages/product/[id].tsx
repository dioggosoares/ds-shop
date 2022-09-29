import { GetStaticPaths, GetStaticProps } from 'next'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/future/image'
import Head from 'next/head'
import Stripe from 'stripe'
import { toast } from 'react-toastify'

// IMPORT CSS
import 'react-toastify/dist/ReactToastify.css'

import { stripe } from '../../services/stripe'

import { ProductProps } from '../../@types/Product'
import { currencyFormatter } from '../../utils/currencyFormatter'

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  function handleAddItem() {
    addItem(product)
    toast(`${product.name}, foi adicionado ao carrinho`, {
      autoClose: 2000,
      className: 'toastBody',
    })
  }

  const winTitle = `${product.name} | D-Shop`

  return (
    <>
      <Head>
        <title>{winTitle}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{currencyFormatter(product.price / 100)}</span>

          <p>{product.description}</p>

          <button onClick={handleAddItem}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_MOEQMuJg3i08E5' } }],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  const details = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: price.unit_amount!,
    description: product.description,
    defaultPriceId: price.id,
    sku: product.id,
  }

  return {
    props: {
      product: details,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
