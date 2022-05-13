import { useMutation } from '@apollo/client/react/hooks'
import { CartCreateMutation } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartCreateMutation'
import { CartLineAddMutation } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartLineAddMutation'
import { Scalars } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
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
  cartId?: Scalars['ID']
  addToCart?: (item: CartItem) => void
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  cartSize: 0,
})

export const CartProvider: React.FC<CartProviderProps> = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartSize, setCartSize] = useState<number>(0)
  const [cartId, setCartId] = useState<Scalars['ID']>()
  const GET_CART_CREATE = loader('src/graphql/queries/cartCreate.mutation.graphql')
  const GET_CART_LINES_ADD = loader('src/graphql/queries/cartLinesAdd.mutation.graphql')
  const [cartCreate] = useMutation<CartCreateMutation>(GET_CART_CREATE)
  const [cartLinesAdd] = useMutation<CartLineAddMutation>(GET_CART_LINES_ADD)

  const createCart = (firstItem: CartItem) => {
    cartCreate({
      variables: {
        input: {
          lines: [
            {
              quantity: firstItem.quantity,
              merchandiseId: firstItem.item,
            },
          ],
        },
      },
    })
      .then((r) => {
        setCartId(r?.data?.cartCreate?.cart?.id)
      })
      .catch((err) => {
        throw new Error('Error creating cart', err)
      })
  }

  const addLinesToCart = (item: CartItem) => {
    cartLinesAdd({
      variables: {
        cartId,
        lines: [
          {
            quantity: item.quantity,
            merchandiseId: item.item,
          },
        ],
      },
    }).catch((err) => {
      throw new Error('Error adding to cart', err)
    })
  }

  const addToCart = (item: CartItem) => {
    setCartItems((prevState) => [...prevState, item])
    setCartSize((prevState) => prevState + item.quantity)
    console.log('addToCart with cartId', cartId)
    if (cartId) {
      addLinesToCart(item)
    } else {
      createCart(item)
    }
  }

  const cartItemsMemo = useMemo(() => ({ cartItems, addToCart }), [cartItems, cartId])

  const cartSizeMemo = useMemo(() => ({ cartSize, addToCart }), [cartSize, cartId])

  const cartIdMemo = useMemo(() => ({ cartId, addToCart }), [cartId])

  return (
    <CartContext.Provider value={{ ...cartItemsMemo, ...cartSizeMemo, ...cartIdMemo }}>{children}</CartContext.Provider>
  )
}
