import { useLazyQuery } from '@apollo/client/react/hooks'
import { TrashIcon } from '@heroicons/react/outline'
import { CartQueryQuery } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartQuery'
import { MoneyV2, Scalars } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  CartContext,
  Icon,
  IconName,
  Layout,
  Loader,
  Notification,
  QuantitySelect,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { famousRoastersClient } from 'src/config'
import { useAuth } from 'src/config/cognito'
import LoadingContext from 'src/hooks/isLoading'
import { formatPrice, getSimplifiedId } from 'src/utils'
import { UserProfile } from 'src/views/User'

const USER_PROFILE = loader('src/graphql/queries/userProfile.query.graphql')
const GET_CART = loader('src/graphql/queries/cart.query.graphql')

interface CustomCartProduct {
  vendor: string
  title: string
  id: string
  isGiftCard: boolean
}

interface CustomMerchandise {
  id: string
  product: CustomCartProduct
  priceV2: MoneyV2
  image: {
    url: string
  }
  selectedOptions: Array<{
    value: string
    name: string
  }>
}

export type gtaEcommerceObject = {
  name: string
  id?: string
  price: string
  brand?: string
  variant?: string
  quantity?: number
  packageSize?: string
  grindType?: string
  equipmentVariant?: string
}

export const Cart: React.FC = () => {
  const [user] = useAuth()
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { cartId, modifyQuantity, removeFromCart } = useContext(CartContext)
  const [cartQuery, { loading, data }] = useLazyQuery<CartQueryQuery>(GET_CART)
  const [showMissingItemsWarning, setShowMissingItemsWarning] = useState<boolean>(false)
  let timeout: ReturnType<typeof setTimeout>
  const client = famousRoastersClient()
  const [userProfile, setUserProfile] = useState<UserProfile>()
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const [cartContents, setCartContents] = useState<CartQueryQuery['cart']>()

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (cartId && !data) {
      cartQuery({
        variables: {
          id: cartId,
        },
      })
    }
  }, [cartId])

  useEffect(() => {
    if (data && data.cart) {
      setCartContents(data.cart)
    }
  }, [data])

  useEffect(() => {
    if (searchParams.get('missingItems') === 'true') {
      setShowMissingItemsWarning(true)
      searchParams.delete('missingItems')
      setSearchParams(searchParams)
      timeout = setTimeout(() => {
        setShowMissingItemsWarning(false)
        clearTimeout(timeout)
      }, 3000)
    }
  }, [searchParams.get('missingItems')])

  useEffect(() => {
    user &&
      client
        .query({
          query: USER_PROFILE,
          variables: {
            accessToken: user?.getAccessToken().getJwtToken(),
          },
        })
        .then((res) => {
          res.data && setUserProfile(res.data.userProfile)
        })
  }, [user])

  if (loading && !isLoading) {
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

  const generateCheckoutUrl = () => {
    const checkoutUrl = [data?.cart?.checkoutUrl]

    userProfile?.email && checkoutUrl.push(`?checkout[email]=${userProfile?.email}`)

    if (userProfile?.shipping) {
      checkoutUrl.push('&')
      userProfile?.shipping?.firstName &&
        checkoutUrl.push(`checkout[shipping_address][first_name]=${userProfile?.shipping?.firstName}&`)
      userProfile?.shipping?.lastName &&
        checkoutUrl.push(`checkout[shipping_address][last_name]=${userProfile?.shipping?.lastName}&`)
      userProfile?.shipping?.company &&
        checkoutUrl.push(`checkout[shipping_address][company]=${userProfile?.shipping?.company}&`)
      userProfile?.shipping?.street &&
        checkoutUrl.push(`checkout[shipping_address][address1]=${userProfile?.shipping?.street}&`)
      userProfile?.shipping?.additionalInfo &&
        checkoutUrl.push(`checkout[shipping_address][address2]=${userProfile?.shipping?.additionalInfo}&`)
      userProfile?.shipping?.city &&
        checkoutUrl.push(`checkout[shipping_address][city]=${userProfile?.shipping?.city}&`)
      userProfile?.shipping?.zipCode &&
        checkoutUrl.push(`checkout[shipping_address][zip]=${userProfile?.shipping?.zipCode}`)
    }

    return checkoutUrl.join('')
  }

  const renderCartWithItems = () => {
    const { lines, cost } = cartContents || {}

    const vendors = new Set(
      lines?.edges
        .filter((e) => (e.node.merchandise as unknown as CustomMerchandise).product.isGiftCard === false)
        .map((e) => (e.node.merchandise as unknown as CustomMerchandise).product.vendor),
    ).size

    return (
      <>
        <div className="grid gap-2 grid-cols-1">
          {lines &&
            lines.edges.map((cartEdge, idx: number) => {
              const { product, image, selectedOptions, priceV2 } = cartEdge.node
                .merchandise as unknown as CustomMerchandise
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
        <div className={`w-full grid gap-4 ${vendors > 1 ? 'lg:grid-cols-2' : ''} my-6`}>
          {vendors > 1 && (
            <div className="p-4 bg-brand-grey-whisper grid grid-cols-[30px,_1fr] gap-4">
              <Icon name={IconName.Info} />
              <Typography type={TypographyType.Paragraph} size={TypographySize.Tiny}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('pages.cart.multiPackage'),
                  }}
                />
              </Typography>
            </div>
          )}
          <div className="flex justify-end items-center">
            {cost && (
              <div className="grid justify-items-start justify-items-end mt-6 lg:mt-0">
                <Typography type={TypographyType.Heading} size={TypographySize.Small} className="mr-1">
                  {formatPrice(cost.totalAmount.amount, cost.totalAmount.currencyCode)}
                </Typography>
                <Typography
                  as="div"
                  type={TypographyType.Paragraph}
                  size={TypographySize.Tiny}
                  className="text-coreUI-text-secondary"
                >
                  {t('pages.cart.priceIncl')}
                </Typography>
              </div>
            )}
          </div>
        </div>

        <div className="relative grid gap-4 md:grid-cols-2 md:my-6 md:w-1/2 md:left-1/2">
          <div className="grid md:order-2 justify-items-end">
            <a id="toCheckout" href={generateCheckoutUrl()} className="flex w-full" data-testid="goToCheckout">
              <Button
                type="button"
                emphasis={ButtonEmphasis.Primary}
                size={ButtonSize.md}
                fullWidth
                onClick={() => setIsLoading(true)}
              >
                {t('pages.cart.ctaCheckout')}
              </Button>
            </a>
          </div>
          <div className="grid md:order-1 push justify-items-start">
            <Link to="/catalogue" className="flex w-full">
              <Button
                type="button"
                emphasis={ButtonEmphasis.Secondary}
                size={ButtonSize.md}
                data-testid="continueShopping"
                fullWidth
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
      <Helmet>
        <title>
          {t('brand.name')} | {t('pages.cart.displayTitle')}
        </title>
        <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_SHOP}/cart`} />
        <meta name="robots" content="noindex" />
      </Helmet>
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
          {cartId && cartContents && cartContents.lines.edges.length > 0 ? renderCartWithItems() : renderEmptyCart()}
        </div>
      </main>
    </Layout>
  )
}
