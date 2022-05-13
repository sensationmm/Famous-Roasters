import { useLazyQuery } from '@apollo/client/react/hooks'
import { CartQueryQuery } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartQuery'
import { loader } from 'graphql.macro'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  CartContext,
  Layout,
  Loader,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

export const Cart: React.FC = () => {
  const { t } = useTranslation()
  const GET_CART = loader('src/graphql/queries/cart.query.graphql')
  const { cartId } = useContext(CartContext)
  const [cartQuery, { loading, data }] = useLazyQuery<CartQueryQuery>(GET_CART)

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.cart.title')}`
  }, [])

  useEffect(() => {
    if (cartId) {
      cartQuery({
        variables: {
          id: cartId,
        },
      }).catch((err) => {
        throw new Error('Error fetching cart', err)
      })
    }
  }, [cartId])

  if (loading) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  const renderNoItems = () => (
    <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Large} className="text-center">
      TODO localise: No items
    </Typography>
  )

  const renderCartItems = () => (
    <div className="grid gap-2 grid-cols-1">
      {data?.cart?.lines.edges.map((cartEdge, idx: number) => {
        const { product, image } = cartEdge.node.merchandise
        return (
          <div key={`cart-item-${idx}`} className="flex">
            <div className="shrink-0">
              <img src={image?.url} alt={product.title} className="w-32" />
            </div>
            <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Large} className="text-center">
              {product.title} ({cartEdge.node.quantity})
            </Typography>
          </div>
        )
      })}
    </div>
  )

  return (
    <Layout>
      <main className="flex flex-grow w-full items-start justify-center bg-white mt-4 mb-4">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
          {data?.cart ? renderCartItems() : renderNoItems()}
          {data?.cart && (
            <a href={data?.cart?.checkoutUrl} data-testid="goToCheckout">
              <Button
                type="button"
                emphasis={ButtonEmphasis.Primary}
                size={ButtonSize.md}
                className="flex w-full justify-center mt-20"
              >
                Go to checkout
              </Button>
            </a>
          )}
        </div>
      </main>
    </Layout>
  )
}
