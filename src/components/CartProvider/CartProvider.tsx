import { CartProvider as ShopifyCartProvider } from '@shopify/hydrogen/client'
import React, { useCallback } from 'react'
import { CartUIProvider, useCartUI } from 'src/components'

interface CartProviderProps {
  children: React.ReactNode
  numCartLines?: number
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, numCartLines }: CartProviderProps) => {
  return (
    <CartUIProvider>
      <Provider numCartLines={numCartLines}>{children}</Provider>
    </CartUIProvider>
  )
}

const Provider: React.FC<CartProviderProps> = ({ children, numCartLines }: CartProviderProps) => {
  const { openCart } = useCartUI()

  const open = useCallback(() => {
    openCart()
  }, [openCart])

  return (
    <>
      <ShopifyCartProvider numCartLines={numCartLines} onLineAdd={open} onCreate={open}>
        {children}
      </ShopifyCartProvider>
    </>
  )
}
