import { useLazyQuery } from '@apollo/client/react/hooks'
import { HubPayload } from '@aws-amplify/core'
import { Auth, Hub } from 'aws-amplify'
import { loader } from 'graphql.macro'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import CoffeeKnowledge from 'src/assets/images/profile/coffee-knowledge.png'
import EthopianCoffee from 'src/assets/images/profile/ethiopian-coffee.png'
import NomadCoffee from 'src/assets/images/profile/nomad-coffee.png'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  Carousel,
  CoffeeAroma,
  IconName,
  InfoBox,
  Layout,
  Loader,
  MyAroma,
  NavigationTheme,
  OrderTile,
  ProductTile,
  TasteProfileProps,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { famousRoastersClient, shopifyAccessoryCollection, storeFrontClient } from 'src/config'
import { useAuth } from 'src/config/cognito'
import useBreakpoint from 'src/hooks/useBreakpoint'
const USER_PROFILE = loader('src/graphql/queries/userProfile.query.graphql')
const SIGN_UP = loader('src/graphql/queries/signUp.query.graphql')
import { formatDate, formatPrice, getSimplifiedId } from 'src/utils'

import { CollectionQuery } from '../Catalogue'
import { ProductCustom } from '../Product'
import { Order } from './Orders'

interface TasteFinderProfile extends TasteProfileProps {
  coffeeType: string
}

interface RatedProduct {
  shopifyId: string
  rating: number
}

interface UserProfile {
  id: string
  email: string
  newsletterSignup: boolean
  tasteFinderProfile: TasteFinderProfile
  aroma: CoffeeAroma
  ratedProducts: RatedProduct[]
}

export const Profile: React.FC = () => {
  const [user] = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const breakpoint = useBreakpoint()
  const [userName, setUserName] = useState<string>()
  const [userProfile, setUserProfile] = useState<UserProfile>()
  const [lastOrder, setLastOrder] = useState<Order['node']>()
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false)
  const [getUserProfile] = useLazyQuery(USER_PROFILE)
  const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')
  const shopifyClient = storeFrontClient()
  const [accessories, setAccessories] = useState<ProductCustom[]>([])
  const [loadingAccessories, setLoadingAccessories] = useState<boolean>(true)

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.profile.title')}`

    accessories.length === 0 && fetchAccessories()
  }, [])

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      const client = famousRoastersClient()
      const { event } = payload as HubPayload
      if (event === 'cognitoHostedUI') {
        const jwtToken = payload.data.signInUserSession.accessToken.jwtToken
        client
          .query({
            query: SIGN_UP,
            variables: {
              accessToken: jwtToken,
            },
          })
          .then(() => {
            window.localStorage.setItem('authToken', jwtToken)
          })
          .catch((e) => {
            throw new Error('Error with hosted sign in', e)
          })
      }
    })
  }, [])

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((u) => {
        setUserName(u.attributes['custom:first_name'])

        getUserProfile()
          .then((res) => {
            setUserProfile(res.data.userProfile)
          })
          .catch(() => {
            signOut()
          })

        setOrdersLoading(true)
        const token = localStorage.getItem('authToken')
        fetch(process.env.REACT_APP_FAMOUS_ROASTERS_ORDERS_ENDPOINT as string, {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.data.orders.edges.length > 0) {
              setLastOrder(res.data.orders.edges[0].node)
              setOrdersLoading(false)
            } else {
              setOrdersLoading(false)
            }
          })
          .catch(() => {
            setOrdersLoading(false)
          })
      })
      .catch(() => {
        navigate('/login')
      })
  }, [user?.isValid])

  const fetchAccessories = async () => {
    shopifyClient
      .query({
        query: GET_PRODUCTS,
        variables: {
          collectionId: shopifyAccessoryCollection,
          first: 10,
          last: null,
          before: null,
          after: null,
          sortKey: undefined,
          reverse: undefined,
        },
      })
      .then((res) => {
        const { data } = res
        setLoadingAccessories(false)
        const nodes = ((data as CollectionQuery)?.collection?.products?.nodes || [])
          .slice()
          .filter((node) => node.totalInventory && node.totalInventory > 0)
          .sort(() => Math.random() - 0.5)

        setAccessories(nodes)
      })
      .catch((err) => {
        console.log(err.networkError)
        throw new Error('Error fetching accessories', err)
      })
  }

  const signOut = async () => {
    await Auth.signOut().catch((err) => new Error(err))
    navigate('/login')
    window.location.reload()
    window.localStorage.removeItem('authToken')
  }

  const containerStyle = 'w-full border-b border-brand-grey-bombay'
  const sectionStyle = 'w-full max-w-7xl mx-auto px-6 xl:px-8 py-8'

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex flex-col flex-grow w-full items-start bg-white mt-4y">
        <div className={containerStyle}>
          <div className={`${sectionStyle} ${userProfile ? 'md:grid md:grid-cols-2 md:gap-20' : ''}`}>
            {userProfile ? (
              <>
                <div>
                  <Typography
                    as="h1"
                    type={TypographyType.Heading}
                    size={TypographySize.Base}
                    className="font-syne mb-3"
                  >
                    {t('pages.profile.greeting')}{' '}
                    {userName || t('pages.featuredProduct.yourCoffeeType.namePlaceholder')},
                  </Typography>
                  <Typography as="p" size={TypographySize.Base}>
                    {t('pages.profile.intro')}
                  </Typography>
                </div>
                <div className="flex items-center justify-center pt-6 mt-6 border-t border-brand-grey-bombay md:pt-0 md:mt-0 md:border-0">
                  <MyAroma
                    aroma={userProfile.aroma}
                    name={t('pages.featuredProduct.yourCoffeeType.my')}
                    headingAs="h2"
                    isProfile
                  />
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div className={containerStyle}>
          <div className={`${sectionStyle} grid gap-4 md:grid-cols-2 xl:grid-cols-3`}>
            <Button
              data-testid="button-orders"
              emphasis={ButtonEmphasis.Tertiary}
              icon={IconName.Orders}
              hasArrow
              onClick={() => navigate('/orders')}
            >
              {t('pages.profile.links.orders')}
            </Button>
            <Button
              data-testid="button-account"
              emphasis={ButtonEmphasis.Tertiary}
              icon={IconName.Account}
              hasArrow
              onClick={() => navigate('/account')}
            >
              {t('pages.profile.links.account')}
            </Button>
            <Button
              data-testid="button-taste-profile"
              emphasis={ButtonEmphasis.Tertiary}
              icon={IconName.Taste}
              hasArrow
              onClick={() => navigate('/taste-finder?step=bearbeiten')}
            >
              {t('pages.profile.links.tasteProfile')}
            </Button>
          </div>
        </div>

        {ordersLoading && (
          <div className={containerStyle}>
            <div className={`${sectionStyle}`}>
              <Loader />
            </div>
          </div>
        )}

        {lastOrder && (
          <div className={containerStyle}>
            <div className={`${sectionStyle} pb-0`}>
              <Typography as="h2" type={TypographyType.Heading} size={TypographySize.Small} className="mb-3">
                {t('pages.profile.sections.lastOrder.title')}
              </Typography>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                <div>
                  <Typography as="label" size={TypographySize.Small} className="font-bold">
                    {t('pages.profile.sections.lastOrder.orderNumber')}
                  </Typography>
                  <br />
                  <Typography size={TypographySize.Small}>{lastOrder.name}</Typography>
                </div>
                <div>
                  <Typography as="label" size={TypographySize.Small} className="font-bold">
                    {t('pages.profile.sections.lastOrder.totalAmount')}
                  </Typography>
                  <br />
                  <Typography size={TypographySize.Small}>
                    {formatPrice(
                      lastOrder.totalPriceSet.shopMoney.amount,
                      lastOrder.totalPriceSet.shopMoney.currencyCode,
                    )}
                  </Typography>
                </div>
                <div>
                  <Typography as="label" size={TypographySize.Small} className="font-bold">
                    {t('pages.profile.sections.lastOrder.orderDate')}
                  </Typography>
                  <br />
                  <Typography size={TypographySize.Small}>{formatDate(lastOrder.createdAt)}</Typography>
                </div>
                <div>
                  <Typography as="label" size={TypographySize.Small} className="font-bold">
                    {t('pages.profile.sections.lastOrder.paymentStatus')}
                  </Typography>
                  <br />
                  <Typography size={TypographySize.Small}>
                    {t(`shopify.paymentStatus.${lastOrder.displayFinancialStatus}`)}
                  </Typography>
                </div>
                <div>
                  <Typography as="label" size={TypographySize.Small} className="font-bold">
                    {t('pages.profile.sections.lastOrder.orderStatus')}
                  </Typography>
                  <br />
                  <Typography size={TypographySize.Small}>
                    {t(`shopify.deliveryStatus.${lastOrder.displayFulfillmentStatus}`)}
                  </Typography>
                </div>
              </div>

              <div className="mt-8">
                <InfoBox
                  title={t('pages.profile.sections.lastOrder.infoTitle')}
                  text={t('pages.profile.sections.lastOrder.infoText')}
                />
              </div>

              <div className="pt-2 pb-8">
                <Carousel
                  slides={lastOrder.lineItems.edges.map((item) => {
                    const hasRated = (userProfile?.ratedProducts?.map((item) => item.shopifyId) || []).findIndex(
                      (el) => el === getSimplifiedId(item.node.product.id),
                    )

                    return (
                      <OrderTile
                        node={item.node}
                        productId={item.node.product.id}
                        showRate
                        hasRated={hasRated > -1 ? userProfile?.ratedProducts[hasRated]?.rating : 0}
                      />
                    )
                  })}
                  tile
                />
              </div>
            </div>
          </div>
        )}

        {loadingAccessories && (
          <div className={containerStyle}>
            <div className={`${sectionStyle}`}>
              <Loader />
            </div>
          </div>
        )}

        <div className={containerStyle}>
          <div className={`${sectionStyle}`}>
            {/* TODO: make this content dynamic from CMS */}
            <div className="grid w-full gap-y-8 md:grid-cols-2 md:gap-4">
              <div className="grid grid-cols-[150px_1fr] gap-4 border-b border-brand-grey-bombay md:max-w-sm md:border-0 pb-8 md:pb-0">
                <Link to={'/catalogue?products[refinementList][vendor][0]=Nomad'}>
                  <img src={NomadCoffee} className="w-full" />
                </Link>
                <div className="flex flex-col justify-center">
                  <Typography as="p" className="mb-4">
                    Neu bei 60beans: Nomad Coffee aus Barcelona!
                  </Typography>
                  <Button
                    data-testid="button-[vendor][0]=Nomad"
                    emphasis={ButtonEmphasis.Secondary}
                    size={ButtonSize.xs}
                    onClick={() => navigate('/catalogue?products[refinementList][vendor][0]=Nomad')}
                    center
                  >
                    {t('pages.profile.sections.discover.cta')}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] gap-4 md:max-w-sm pd-8 md:pb-0">
                <Link to={'/catalogue?products[refinementList][meta.my_fields.origin][0]=ET'}>
                  <img src={EthopianCoffee} className="w-full" />
                </Link>
                <div className="flex flex-col justify-center">
                  <Typography as="p" className="mb-4">
                    Entdecke den Kaffee Äthiopiens!
                  </Typography>
                  <Button
                    data-testid="button-[meta.my_fields.origin][0]=ET"
                    emphasis={ButtonEmphasis.Secondary}
                    size={ButtonSize.xs}
                    onClick={() => navigate('/catalogue?products[refinementList][meta.my_fields.origin][0]=ET')}
                    center
                  >
                    {t('pages.profile.sections.discover.cta')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {accessories.length > 0 && (
          <div className={containerStyle}>
            <div className={sectionStyle}>
              <Typography as="h2" type={TypographyType.Heading} size={TypographySize.Small} className="mb-3">
                {t('pages.profile.sections.lastOrder.productSuggestionTitle')}
              </Typography>
              <Typography as="p" size={TypographySize.Base} className="mb-3">
                {t('pages.profile.sections.lastOrder.productSuggestionText')}
              </Typography>
              <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {accessories.slice(0, breakpoint === 'lg' ? 3 : 2).map((node: ProductCustom, i: number) => {
                  const id = getSimplifiedId(node.id)
                  return (
                    <Link to={`/product/${id}`} key={`product-tile-link-${i}`}>
                      <ProductTile key={`title-${i}`} productNode={node} />
                    </Link>
                  )
                })}
              </div>
              <div className="flex justify-center pt-14">
                <Button emphasis={ButtonEmphasis.Tertiary} onClick={() => navigate('/catalogue/accessories')} fullWidth>
                  {t('pages.profile.sections.lastOrder.productSuggestionCTA')}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={containerStyle}>
          <div className={`${sectionStyle} pb-14`}>
            <Typography as="h2" type={TypographyType.Heading} size={TypographySize.Small}>
              {t('pages.profile.sections.discover.title')}
            </Typography>

            {/* TODO: make this content dynamic from CMS */}
            <div className="grid w-full md:grid-cols-2">
              <div className="grid grid-cols-2 grid-cols-[150px_1fr] gap-4 px-0 py-6 border-b border-brand-grey-bombay md:max-w-sm md:border-0">
                <Link to={`${process.env.REACT_APP_DOMAIN_BLOG}/de/Zubereitungstipps`}>
                  <img src={CoffeeKnowledge} className="w-full" />
                </Link>
                <div className="flex flex-col justify-center">
                  <Typography as="p" className="mb-4">
                    Entdecke weitere Zubereitungstipps im 60beans Blog.
                  </Typography>
                  <Button
                    data-testid="button-blog"
                    emphasis={ButtonEmphasis.Secondary}
                    size={ButtonSize.xs}
                    onClick={() => navigate(`${process.env.REACT_APP_DOMAIN_BLOG}/de/Zubereitungstipps`)}
                    center
                  >
                    {t('pages.profile.sections.discover.ctaBlog')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
