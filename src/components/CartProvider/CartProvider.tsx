import { useLazyQuery, useMutation } from '@apollo/client/react/hooks'
import { CartCreateMutation } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartCreateMutation'
import { CartLineAddMutation } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartLineAddMutation'
import { CartLineRemoveMutation } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartLineRemoveMutation'
import { CartLineUpdateMutation } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartLineUpdateMutation'
import { CartQueryQuery } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartQuery'
import { Scalars } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'src/utils'

interface CartProviderProps {
  children: React.ReactNode
}

export interface CartItem {
  quantity: number
  item: Scalars['ID']
}

interface CartContextProps {
  cartSize?: number
  cartId?: Scalars['ID']
  addToCart?: (item: CartItem) => void
  removeFromCart?: (item: Scalars['ID'], actualQty: number) => void
  modifyQuantity?: (lineId: Scalars['ID'], quantity: number) => void
}

export const CartContext = createContext<CartContextProps>({})

export const CartProvider: React.FC<CartProviderProps> = ({ children }: CartProviderProps) => {
  const [cartSize, setCartSize] = useState<number>()
  const [cartId, setCartId] = useState<Scalars['ID']>()
  const GET_CART = loader('src/graphql/queries/cart.query.graphql')
  const GET_CART_CREATE = loader('src/graphql/queries/cartCreate.mutation.graphql')
  const GET_CART_LINES_ADD = loader('src/graphql/queries/cartLinesAdd.mutation.graphql')
  const GET_CART_LINES_REMOVE = loader('src/graphql/queries/cartLinesRemove.mutation.graphql')
  const GET_CART_LINES_UPDATE = loader('src/graphql/queries/cartLinesUpdate.mutation.graphql')
  const [cartQuery] = useLazyQuery<CartQueryQuery>(GET_CART)
  const [cartCreate] = useMutation<CartCreateMutation>(GET_CART_CREATE)
  const [cartLinesAdd] = useMutation<CartLineAddMutation>(GET_CART_LINES_ADD)
  const [cartLinesRemove] = useMutation<CartLineRemoveMutation>(GET_CART_LINES_REMOVE)
  const [cartLinesUpdate] = useMutation<CartLineUpdateMutation>(GET_CART_LINES_UPDATE)
  const [storedCartId, setStoredCartId] = useLocalStorage('cartId', '')

  useEffect(() => {
    if (storedCartId) {
      cartQuery({
        variables: {
          id: storedCartId,
        },
      })
        .then((r) => {
          const quantities = r.data?.cart?.lines.edges.map((node) => node.node.quantity)
          // stale cart check
          if (r.data?.cart === null) {
            setStoredCartId('')
          }
          const size = quantities?.reduce((x, y) => x + y)
          setCartId(storedCartId)
          size && setCartSize(size)
        })
        .catch((err) => {
          throw new Error('Error fetching cart', err)
        })
    } else {
      setCartSize(0)
    }
  }, [])

  const createCart = async (firstItem: CartItem) => {
    await cartCreate({
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
        const cid = r?.data?.cartCreate?.cart?.id
        cid && setCartId(cid)
        cid && setStoredCartId(cid)
        setCartSize(firstItem.quantity)
      })
      .catch((err) => {
        throw new Error('Error creating cart', err)
      })
  }

  const addLinesToCart = async (item: CartItem, localStorageCartId: string) => {
    await cartLinesAdd({
      variables: {
        cartId: localStorageCartId,
        lines: [
          {
            quantity: item.quantity,
            merchandiseId: item.item,
          },
        ],
      },
    })
      .then((res) => {
        const quantities = res.data?.cartLinesAdd?.cart?.lines.edges.map((node) => node.node.quantity)
        const size = quantities?.reduce((x, y) => x + y)
        size && setCartSize(size)
      })
      .catch((err) => {
        throw new Error('Error adding to cart', err)
      })
  }

  const addToCart = async (item: CartItem) => {
    const localStorageCartIdValue = window.localStorage.getItem('cartId')
    const localStorageCartId = (localStorageCartIdValue && JSON.parse(localStorageCartIdValue)) || null
    // this step could be avoided if using a localstorage listener
    if (localStorageCartId) {
      await addLinesToCart(item, localStorageCartId)
      if (!cartId) setCartId(localStorageCartId)
    } else {
      await createCart(item)
    }
  }

  const removeFromCart = (lineId: Scalars['ID'], actualQty: number) => {
    if (actualQty === cartSize) {
      setCartId(undefined)
      setCartSize(0)
      setStoredCartId('')
    } else {
      cartLinesRemove({
        variables: {
          cartId,
          lineIds: [lineId],
        },
      })
        .then((res) => {
          const quantities = res.data?.cartLinesRemove?.cart?.lines.edges.map((node) => node.node.quantity)
          const size = quantities?.length ? quantities?.reduce((x, y) => x + y) : 0
          size && setCartSize(size)
        })
        .catch((err) => {
          throw new Error('Error removing from cart', err)
        })
    }
  }

  const modifyQuantity = (lineId: Scalars['ID'], quantity: number) => {
    cartLinesUpdate({
      variables: {
        cartId,
        lines: [
          {
            id: lineId,
            quantity,
          },
        ],
      },
    })
      .then((res) => {
        const quantities = res.data?.cartLinesUpdate?.cart?.lines.edges.map((node) => node.node.quantity)
        const size = quantities?.reduce((x, y) => x + y)
        size && setCartSize(size)
      })
      .catch((err) => {
        throw new Error('Error modifying quantity on cart', err)
      })
  }

  const cartMemo = useMemo(
    () => ({ cartId, storedCartId, cartSize, addToCart, removeFromCart, modifyQuantity }),
    [cartSize],
  )

  return <CartContext.Provider value={{ ...cartMemo }}>{children}</CartContext.Provider>
}
