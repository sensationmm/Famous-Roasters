import { useLazyQuery } from '@apollo/client/react/hooks'
import { CartQueryQuery } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartQuery'
import { loader } from 'graphql.macro'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  CartContext,
  Layout,
  Loader,
  QuantitySelect,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

import { formatPrice } from '../../utils'

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

  const renderEmptyCart = () => (
    <div className="mt-4">
      <Typography
        as="div"
        type={TypographyType.Paragraph}
        size={TypographySize.Large}
        className="mt-4 flex justify-center"
      >
        {t('pages.cart.noItems')}
      </Typography>
      <div className="mt-4 flex justify-center">
        <Link to="/catalogue" className="flex w-full md:w-max justify-center">
          <Button
            type="button"
            emphasis={ButtonEmphasis.Primary}
            size={ButtonSize.md}
            className="flex w-full justify-center"
            data-testid="continueShopping"
          >
            {t('pages.cart.ctaContinue')}
          </Button>
        </Link>
      </div>
    </div>
  )

  const renderCartWithItems = () => {
    const { lines, estimatedCost } = data?.cart || {}
    return (
      <>
        <div className="grid gap-2 grid-cols-1">
          {lines &&
            lines.edges.map((cartEdge, idx: number) => {
              const { product, image, selectedOptions } = cartEdge.node.merchandise
              return (
                <div key={`cart-item-${idx}`} className={idx < lines.edges.length - 1 ? 'flex mb-8' : 'flex'}>
                  <div className="shrink-0">
                    <img src={image?.url} alt={product.title} className="w-32" />
                  </div>
                  <div className="flex flex-col justify-between justify-items-start">
                    <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Large}>
                      {product.title}
                    </Typography>
                    <div>
                      {selectedOptions.map((option, idx: number) => (
                        <Typography
                          key={`cart-item-detail-${idx}`}
                          type={TypographyType.Paragraph}
                          size={TypographySize.Base}
                        >
                          {idx < selectedOptions?.length - 1 ? `${option.value} | ` : option.value}
                        </Typography>
                      ))}
                    </div>
                    <QuantitySelect
                      min={1}
                      max={10}
                      value={cartEdge.node.quantity}
                      onChange={(q: number) => console.log('change quantity!', q)}
                    />
                  </div>
                </div>
              )
            })}
        </div>
        <div className="grid justify-items-end">
          {estimatedCost && (
            <Typography type={TypographyType.Label} size={TypographySize.Large} className="mr-1">
              {formatPrice(estimatedCost.totalAmount.amount, estimatedCost.totalAmount.currencyCode)}
            </Typography>
          )}
        </div>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mt-4">
          <div className="grid md:order-2 justify-items-end">
            <a href={data?.cart?.checkoutUrl} className="flex w-full md:w-max" data-testid="goToCheckout">
              <Button
                type="button"
                emphasis={ButtonEmphasis.Primary}
                size={ButtonSize.md}
                className="flex w-full justify-center"
              >
                {t('pages.cart.ctaCheckout')}
              </Button>
            </a>
          </div>
          <div className="grid md:order-1 push justify-items-start">
            <Link to="/catalogue" className="flex w-full md:w-max">
              <Button
                type="button"
                emphasis={ButtonEmphasis.Secondary}
                size={ButtonSize.md}
                className="flex w-full justify-center"
                data-testid="continueShopping"
              >
                {t('pages.cart.ctaContinue')}
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <Layout>
      <main className="flex flex-grow w-full items-start justify-center bg-white mt-4 mb-4">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
          {data?.cart ? renderCartWithItems() : renderEmptyCart()}
        </div>
      </main>
    </Layout>
  )
}
