import { useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { HandbagSimple } from 'phosphor-react'
import { useKeenSlider } from 'keen-slider/react'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'

// IMPORT CSS
import 'keen-slider/keen-slider.min.css'

import { HomeProps } from '../@types/Home'
import { stripe } from '../services/stripe'
import { Arrow } from '../components/Arrow'

import {
  ButtonBag,
  HomeContainer,
  NavigationWrapper,
  ProductContainer,
  Product,
} from '../styles/pages/home'
import { currencyFormatter } from '../utils/currencyFormatter'

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | D-Shop</title>
      </Head>

      <NavigationWrapper>
        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map((product) => {
            return (
              <ProductContainer key={product.id}>
                <Link href={`/product/${product.id}`} prefetch={false}>
                  <Product className="keen-slider__slide">
                    <Image
                      src={product.imageUrl}
                      width={520}
                      height={480}
                      alt=""
                    />

                    <footer>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.price}</span>
                      </div>
                      <ButtonBag>
                        <HandbagSimple size={28} />
                      </ButtonBag>
                    </footer>
                  </Product>
                </Link>
              </ProductContainer>
            )
          })}
        </HomeContainer>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </NavigationWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: currencyFormatter(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
