import { useLazyQuery } from '@apollo/client/react/hooks'
import { TrashIcon } from '@heroicons/react/outline'
import { CartQueryQuery } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartQuery'
import { Scalars } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  CartContext,
  Layout,
  Loader,
  Notification,
  QuantitySelect,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { formatPrice, getSimplifiedId } from 'src/utils'

export const Cart: React.FC = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const GET_CART = loader('src/graphql/queries/cart.query.graphql')
  const { cartId } = useContext(CartContext)
  const [cartQuery, { loading, data }] = useLazyQuery<CartQueryQuery>(GET_CART)
  const { modifyQuantity, removeFromCart } = useContext(CartContext)
  const [showMissingItemsWarning, setShowMissingItemsWarning] = useState<boolean>(false)
  let timeout: ReturnType<typeof setTimeout>

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.cart.title')}`

    return () => {
      clearTimeout(timeout)
    }
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

  useEffect(() => {
    if (searchParams.get('missingItems') === 'true') {
      setShowMissingItemsWarning(true)
      searchParams.delete('missingItems')
      setSearchParams(searchParams)
      timeout = setTimeout(() => {
        setShowMissingItemsWarning(false)
      }, 3000)
    }
  }, [searchParams.get('missingItems')])

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

  const handleRemoveFromCart = (item: Scalars['ID'], actualQty: number) => {
    removeFromCart && removeFromCart(item, actualQty)
  }

  const handleModifyQuantity = (item: Scalars['ID'], quantity: number) => {
    modifyQuantity && modifyQuantity(item, quantity)
  }

  const renderCartWithItems = () => {
    const { lines, estimatedCost } = data?.cart || {}
    return (
      <>
        <div className="grid gap-2 grid-cols-1">
          {lines &&
            lines.edges.map((cartEdge, idx: number) => {
              const { product, image, selectedOptions, priceV2 } = cartEdge.node.merchandise
              // types are pick and doesnt populate id in typescript
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const productId = product.id
              const lineId = cartEdge.node.id
              return (
                <div
                  key={`cart-item-${idx}`}
                  className={
                    idx < lines.edges.length - 1
                      ? 'flex w-full md:grid-cols-2 pb-6 border-b border-coreUI-border mb-4'
                      : 'flex w-full md:grid-cols-2 pb-6 border-b border-coreUI-border'
                  }
                >
                  <div className="flex justify-center items-center shrink-0 self-start relative w-36 h-36 mr-4">
                    <Link
                      to={`/product/${getSimplifiedId(productId)}`}
                      className="flex justify-center items-center rounded-full bg-coreUI-background-images w-36 h-36"
                    >
                      <img src={image?.url} alt={product.title} className="w-24 max-h-24" />
                    </Link>
                  </div>
                  <div className="flex flex-1 flex-col justify-between justify-items-start md:grid md:grid-cols-3 md:items-center">
                    <div>
                      <Typography as="div" type={TypographyType.Label} size={TypographySize.Base}>
                        {product.title}
                      </Typography>
                      <div>
                        {selectedOptions[0].value !== 'Default Title' &&
                          selectedOptions.map((option, optionIdx: number) => (
                            <Typography
                              key={`cart-item-detail-${optionIdx}`}
                              type={TypographyType.Paragraph}
                              size={TypographySize.Base}
                              className="text-coreUI-text-secondary"
                            >
                              {optionIdx < selectedOptions?.length - 1 ? `${option.value} | ` : option.value}
                            </Typography>
                          ))}
                      </div>
                    </div>
                    <div>
                      <Typography
                        type={TypographyType.Paragraph}
                        size={TypographySize.Base}
                        className="text-coreUI-text-secondary"
                      >
                        {formatPrice(priceV2.amount, priceV2.currencyCode)}
                      </Typography>
                      {selectedOptions[0] &&
                        selectedOptions[0].value !== 'Default Title' &&
                        selectedOptions[0].name === 'Gewicht' && (
                          <Typography
                            type={TypographyType.Paragraph}
                            size={TypographySize.Base}
                            className="text-coreUI-text-secondary ml-1"
                          >
                            (
                            {formatPrice(
                              ((parseFloat(priceV2.amount) * 1000) / parseFloat(selectedOptions[0].value)).toString(),
                              'EUR',
                            )}
                            /kg)
                          </Typography>
                        )}
                    </div>
                    <span className="md:hidden" />
                    <div className="mt-1.5 md:w-full md:flex md:justify-end">
                      <QuantitySelect
                        min={1}
                        max={10}
                        value={cartEdge.node.quantity}
                        onChange={(q: number) => handleModifyQuantity(lineId, q)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(lineId, cartEdge.node.quantity)}
                        data-testid="button-cart-item-remove"
                        className="ml-2 inline-flex items-center px-4 py-2.5 w-fit rounded-full border border-coreUI-text-tertiary"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        {estimatedCost && (
          <div className="grid justify-items-start md:justify-items-end mt-6">
            <Typography
              type={TypographyType.Paragraph}
              size={TypographySize.Tiny}
              className="uppercase text-coreUI-text-secondary"
            >
              {t('pages.cart.subtotal')}
            </Typography>
            <Typography type={TypographyType.Heading} size={TypographySize.Small} className="mr-1">
              {formatPrice(estimatedCost.totalAmount.amount, estimatedCost.totalAmount.currencyCode)}
            </Typography>
            <Typography
              as="div"
              type={TypographyType.Paragraph}
              size={TypographySize.Tiny}
              className="text-coreUI-text-secondary"
            >
              {t('pages.product.transactional.price.footNote')}
            </Typography>
          </div>
        )}
        <div className="grid gap-4 grid-cols-1 md:flex md:justify-end my-6">
          <div className="grid md:order-2 justify-items-end">
            <a
              id="toCheckout"
              href={data?.cart?.checkoutUrl}
              className="flex w-full md:w-max"
              data-testid="goToCheckout"
            >
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
      {showMissingItemsWarning && (
        <Notification
          heading={t('pages.cart.notification.fail.heading')}
          body={t('pages.cart.notification.fail.body')}
          status="fail"
        />
      )}
      <main className="flex flex-grow w-full items-start justify-center bg-white mt-4 mb-4">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
          <Typography as={'h1'} type={TypographyType.Heading} size={TypographySize.Small} className="mb-4">
            {t('pages.cart.displayTitle')}
          </Typography>
          {cartId && data?.cart && data.cart.lines.edges.length > 0 ? renderCartWithItems() : renderEmptyCart()}
        </div>
      </main>
    </Layout>
  )
}
