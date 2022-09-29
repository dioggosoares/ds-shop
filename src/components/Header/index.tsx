import Image from 'next/future/image'
import { useEffect, useState } from 'react'
import { HandbagSimple } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import { useRouter } from 'next/router'

import { CartBadge, HeaderApp } from './styles'
import { Cart } from '../Cart'

import logo from '../../assets/logo.svg'

export function Header() {
  const router = useRouter()
  const { cartCount, cartDetails } = useShoppingCart()
  const [isCartHasProduct, setIsCartHasProduct] = useState(true)
  const [toggleCart, setToggleCart] = useState(false)

  function closeCart() {
    setToggleCart(false)
  }

  function continueShopping() {
    console.log(router.pathname)
    if (router.pathname === '/') {
      setToggleCart(false)
    } else {
      setToggleCart(false)
      router.push('/')
    }
  }

  useEffect(() => {
    if (Object.keys(cartDetails ?? {})?.length !== 0) {
      setIsCartHasProduct(true)
    } else {
      setIsCartHasProduct(false)
    }
  }, [cartDetails])

  return (
    <HeaderApp>
      <Image src={logo} alt="" />

      <CartBadge onClick={() => setToggleCart(!toggleCart)}>
        <HandbagSimple size={28} />

        {isCartHasProduct && (
          <div className="absolute flex w-6 h-6">
            <span
              className="absolute -top-12 left-6 inline-flex h-full w-full
              rounded-full bg-[#1ea483] opacity-75 animate-ping"
            />
            <div
              className="relative -top-12 left-6 flex items-center justify-center text-sm text-graycustom-300
              font-bold rounded-full w-6 h-6 bg-[#00875f] border border-[#121214]"
            >
              {cartCount}
            </div>
          </div>
        )}
      </CartBadge>
      <Cart
        toggleCart={toggleCart}
        closeCart={closeCart}
        continueShopping={continueShopping}
      />
    </HeaderApp>
  )
}
