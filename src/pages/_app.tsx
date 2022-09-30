import { useState } from 'react'
import { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import { ToastContainer } from 'react-toastify'
import Router from 'next/router'
import TopBarProgress from 'react-topbar-progress-indicator'

import { Header } from '../components/Header'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

// GLOBAL CSS - TAILWIND
import '../styles/global.scss'

globalStyles()

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ''

// CONFIG ROUTER LOADBAR
TopBarProgress.config({
  barColors: {
    '0': '#7465d450',
    '1.0': '#7465d4',
  },
  shadowBlur: 5,
})

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(false)

  Router.events.on('routeChangeStart', () => {
    setProgress(true)
    // função chamada quando inicia o carregamento da page
  })

  Router.events.on('routeChangeComplete', () => {
    setProgress(false)
    // função chamada quando a nova page carregar
  })

  return (
    <Container>
      <CartProvider
        stripe={stripePromise}
        cartMode="checkout-session"
        currency="BRL"
      >
        {progress && <TopBarProgress />}
        <Header />
        <Component {...pageProps} />
        <ToastContainer
          progressClassName="toastProgress"
          closeButton={false}
          position="top-left"
        />
      </CartProvider>
    </Container>
  )
}
