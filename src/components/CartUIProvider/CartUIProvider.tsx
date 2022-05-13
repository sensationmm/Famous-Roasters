import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface CartUIProviderProps {
  children: React.ReactNode
}

interface CartContextProps {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

export const CartContext = createContext<CartContextProps>({
  isCartOpen: false,
  openCart: () => null,
  closeCart: () => null,
  toggleCart: () => null,
})

export const CartUIProvider: React.FC<CartUIProviderProps> = ({ children }: CartUIProviderProps) => {
  const [open, setOpen] = useState(false)

  const openCart = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const closeCart = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const toggleCart = useCallback(() => {
    setOpen(!open)
  }, [setOpen, open])

  const contextValue = useMemo(() => {
    return {
      isCartOpen: open,
      openCart,
      closeCart,
      toggleCart,
    }
  }, [open, openCart, closeCart, toggleCart])

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export const useCartUI = () => {
  return useContext(CartContext)
}
