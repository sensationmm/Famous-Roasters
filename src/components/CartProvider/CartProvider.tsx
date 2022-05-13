import { Scalars } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import React, { createContext, useMemo, useState } from 'react'

interface CartProviderProps {
  children: React.ReactNode
}

interface CartItem {
  quantity: number
  item: Scalars['ID']
}

interface CartContextProps {
  cartItems: CartItem[]
  cartSize: number
  addToCart?: (item: CartItem) => void
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  cartSize: 0,
})

export const CartProvider: React.FC<CartProviderProps> = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartSize, setCartSize] = useState<number>(0)

  const addToCart = (item: CartItem) => {
    setCartItems((prevState) => [...prevState, item])
    setCartSize((prevState) => prevState + item.quantity)
  }

  const cartItemsMemo = useMemo(() => ({ cartItems, addToCart }), [cartItems])

  const cartSizeMemo = useMemo(() => ({ cartSize, addToCart }), [cartSize])

  return <CartContext.Provider value={{ ...cartItemsMemo, ...cartSizeMemo }}>{children}</CartContext.Provider>
}
