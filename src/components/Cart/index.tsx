import { useState } from 'react'
import axios from 'axios'
import { useShoppingCart } from 'use-shopping-cart'
import { toast } from 'react-toastify'

// IMPORT CSS
import 'react-toastify/dist/ReactToastify.css'

import { CartProps } from '../../@types/Cart'
import { currencyFormatter } from '../../utils/currencyFormatter'
import { ImageContainer } from '../../styles/pages/cart'
import { X } from 'phosphor-react'
import { Spinning } from '../Spinning'

export function Cart({ toggleCart, closeCart, continueShopping }: CartProps) {
  const { cartCount, cartDetails, removeItem, formattedTotalPrice } =
    useShoppingCart()
  const [isLoading, setIsloading] = useState(false)
  const [isCreatingCheckoutSession, setisCreatingCheckoutSession] =
    useState(false)

  async function handleCheckout() {
    setIsloading(true)
    const myCartItems = Object.entries(cartDetails!)
    try {
      setisCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        cartItems: myCartItems.map((cart) => {
          return cart[1]
        }),
      })
      if (response.status === 500) return

      if (response) {
        setIsloading(false)
        toast.loading('Redirecionando...')
        const { checkoutUrl } = response.data
        console.log(checkoutUrl)
        window.location.href = checkoutUrl
      }
    } catch (err) {
      // conectar a uma ferramenta de observabilidade (Datadog /Sentry)
      setisCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
      setIsloading(false)
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 flex flex-col overflow-hidden w-[calc(100vw-2rem)] md:w-[30rem] h-screen
      bg-graycustom-800 py-12 mb-6 items-center justify-between shadow-xl shadow-gray-100/20 ${
        toggleCart
          ? 'translate-x-0 transition-all duration-500 ease-in-out'
          : 'translate-x-full transition-all duration-500 ease-in-out'
      }`}
    >
      <div id="cartItems" className="flex flex-col w-full px-12">
        <div className="flex items-end justify-end w-full mb-6">
          <button onClick={closeCart}>
            <X size={24} />
          </button>
        </div>
        <div>Sacola de compras</div>
        <div className="flex flex-col gap-6 mt-8">
          {Object.entries(cartDetails!).map((cart) => {
            return (
              <div key={cart[1].id} className="flex gap-5">
                <ImageContainer>
                  <img src={cart[1].imageUrl} width={101} height={93} alt="" />
                </ImageContainer>
                <div className="flex flex-col items-start justify-between">
                  <h1>{cart[1].name}</h1>
                  <span className="font-extrabold">
                    {currencyFormatter(cart[1].price / 100)}
                  </span>
                  <button
                    onClick={() => removeItem(cart[1].id)}
                    className="text-primary-500 font-bold text-base"
                  >
                    Remover
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div id="footer" className="flex flex-col w-full px-12 gap-2">
        <div className="flex w-full items-center justify-between">
          <span className="text-gray-100">Quantidade</span>
          <span className="text-gray-100">
            {cartCount === 1 ? cartCount + ' item' : cartCount + ' itens'}
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-gray-100">Valor total:</span>
          <span className="text-gray-100 text-2xl font-bold">
            {formattedTotalPrice!}
          </span>
        </div>
        <button
          type="button"
          className="flex justify-center font-bold mt-12 py-5 rounded-lg bg-primary-500 hover:bg-primary-300
          transition-all delay-150 ease-linear"
          disabled={isCreatingCheckoutSession}
          onClick={handleCheckout}
        >
          {isLoading ? <Spinning /> : 'Finalizar compra'}
        </button>
        <span className="flex items-center justify-center w-full text-sm">
          OU
        </span>
        <button
          className="flex justify-center font-bold py-5 rounded-lg bg-primary-500 hover:bg-primary-300
          transition-all delay-150 ease-linear"
          onClick={continueShopping}
        >
          Continuar comprando
        </button>
      </div>
    </div>
  )
}
