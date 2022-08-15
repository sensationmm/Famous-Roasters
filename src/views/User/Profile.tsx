import { useLazyQuery } from '@apollo/client/react/hooks'
import { Auth } from 'aws-amplify'
import { loader } from 'graphql.macro'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import CoffeeTaste from 'src/assets/images/profile/coffee-taste.png'
import Myanmar from 'src/assets/images/profile/myanmar.png'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  Carousel,
  CoffeeAroma,
  IconName,
  Layout,
  Loader,
  MyAroma,
  NavigationTheme,
  OrderTile,
  TasteProfileProps,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { useAuth } from 'src/config/cognito'
const USER_PROFILE = loader('src/graphql/queries/userProfile.query.graphql')
import { formatDate, formatPrice } from 'src/utils'

interface TasteFinderProfile extends TasteProfileProps {
  coffeeType: string
}

interface UserProfile {
  id: string
  email: string
  newsletterSignup: boolean
  tasteFinderProfile: TasteFinderProfile
  aroma: CoffeeAroma
}

export type OrderVariant = {
  node: {
    id: string
    title: string
    product: {
      id: string
    }
    image: {
      url?: string
      src?: string
    }
    quantity: number
    variant: {
      id: string
      title: string
      price: string
      weight: number
    }
  }
}

type Order = {
  id: string
  name: string
  createdAt: string
  displayFulfillmentStatus: string
  displayFinancialStatus: string
  totalPriceSet: {
    shopMoney: {
      amount: string
      currencyCode: string
    }
  }
  discountCode: string
  lineItems: {
    edges: OrderVariant[]
  }
}

export const Profile: React.FC = () => {
  const [user] = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>()
  const [userProfile, setUserProfile] = useState<UserProfile>()
  const [lastOrder, setLastOrder] = useState<Order>()
  const [getUserProfile] = useLazyQuery(USER_PROFILE)

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.profile.title')}`
  }, [])

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((u) => {
        setUserName(u.attributes['custom:first_name'])

        getUserProfile()
          .then((res) => setUserProfile(res.data.userProfile))
          .catch(() => signOut())

        const token = localStorage.getItem('authToken')
        fetch(process.env.REACT_APP_FAMOUS_ROASTERS_ORDERS_ENDPOINT as string, {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setLastOrder(data.orders.edges[0].node)
          })
      })
      .catch(() => {
        navigate('/login')
      })
  }, [user?.isValid])

  const signOut = async () => {
    await Auth.signOut().catch((err) => new Error(err))
    navigate('/login')
    window.location.reload()
    window.localStorage.removeItem('authToken')
  }

  const sectionStyle = (padLg = false) => {
    const classNames = ['w-full', 'max-w-7xl', 'mx-auto', 'px-6', 'xl:px-8', 'border-b', 'border-brand-grey-bombay']

    if (padLg) {
      classNames.push('py-8')
    } else {
      classNames.push('py-4')
    }

    return classNames.join(' ')
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex flex-col flex-grow w-full items-start bg-white mt-4y">
        <div className={`${sectionStyle(true)} ${userProfile ? 'md:grid md:grid-cols-2 md:gap-4' : ''}`}>
          {userProfile ? (
            <>
              <div>
                <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Base} className="font-syne mb-3">
                  {t('pages.profile.greeting')}
                  <br />
                  {userName || t('pages.featuredProduct.yourCoffeeType.namePlaceholder')}
                </Typography>
                <Typography as="p" size={TypographySize.Small}>
                  {t('pages.profile.intro')}
                </Typography>
              </div>
              {userProfile.aroma && (
                <div className="flex items-center justify-center pt-6 mt-6 border-t border-brand-grey-bombay md:pt-0 md:mt-0 md:border-0">
                  <MyAroma
                    aroma={userProfile.aroma}
                    tasteProfileResults={{
                      sweetness: userProfile?.tasteFinderProfile.sweetness,
                      acidity: userProfile?.tasteFinderProfile.acidity,
                      bitterness: userProfile?.tasteFinderProfile.bitterness,
                      body: userProfile?.tasteFinderProfile.body,
                    }}
                    name={t('pages.featuredProduct.yourCoffeeType.my')}
                    headingAs="h2"
                    isProfile
                  />
                </div>
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
        <div className={`${sectionStyle(true)} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
          <Button
            data-testid="button-orders"
            emphasis={ButtonEmphasis.Tertiary}
            icon={IconName.Orders}
            hasArrow
            onClick={() => navigate('/profile/orders')}
          >
            {t('pages.profile.links.orders')}
          </Button>
          <Button
            data-testid="button-account"
            emphasis={ButtonEmphasis.Tertiary}
            icon={IconName.Account}
            hasArrow
            onClick={() => navigate('/profile/account')}
          >
            {t('pages.profile.links.account')}
          </Button>
          <Button
            data-testid="button-taste-profile"
            emphasis={ButtonEmphasis.Tertiary}
            icon={IconName.Taste}
            hasArrow
            onClick={() => navigate('/profile/taste-profile')}
          >
            {t('pages.profile.links.tasteProfile')}
          </Button>
          <Button
            data-testid="button-my-coffee"
            emphasis={ButtonEmphasis.Tertiary}
            icon={IconName.MyCoffee}
            hasArrow
            onClick={() => navigate('/profile/my-coffee')}
          >
            {t('pages.profile.links.myCoffee')}
          </Button>
        </div>

        {lastOrder ? (
          <div className={sectionStyle()}>
            <Typography as="h2" type={TypographyType.Heading} size={TypographySize.Tiny} className="mb-3">
              {t('pages.profile.sections.lastOrder.title')}
            </Typography>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
              <div>
                <Typography as="label" size={TypographySize.Tiny} className="font-bold">
                  {t('pages.profile.sections.lastOrder.orderNumber')}
                </Typography>
                <br />
                <Typography size={TypographySize.Tiny}>{lastOrder.name}</Typography>
              </div>
              <div>
                <Typography as="label" size={TypographySize.Tiny} className="font-bold">
                  {t('pages.profile.sections.lastOrder.totalAmount')}
                </Typography>
                <br />
                <Typography size={TypographySize.Tiny}>
                  {formatPrice(
                    lastOrder.totalPriceSet.shopMoney.amount,
                    lastOrder.totalPriceSet.shopMoney.currencyCode,
                  )}
                </Typography>
              </div>
              {lastOrder.discountCode && (
                <div>
                  <Typography as="label" size={TypographySize.Tiny} className="font-bold">
                    {t('pages.profile.sections.lastOrder.discount')}
                  </Typography>
                  <br />
                  <Typography size={TypographySize.Tiny}>{lastOrder.discountCode}</Typography>
                </div>
              )}
              <div>
                <Typography as="label" size={TypographySize.Tiny} className="font-bold">
                  {t('pages.profile.sections.lastOrder.orderDate')}
                </Typography>
                <br />
                <Typography size={TypographySize.Tiny}>{formatDate(lastOrder.createdAt)}</Typography>
              </div>
              <div>
                <Typography as="label" size={TypographySize.Tiny} className="font-bold">
                  {t('pages.profile.sections.lastOrder.paymentStatus')}
                </Typography>
                <br />
                <Typography size={TypographySize.Tiny}>
                  {t(`shopify.paymentStatus.${lastOrder.displayFinancialStatus}`)}
                </Typography>
              </div>
              <div>
                <Typography as="label" size={TypographySize.Tiny} className="font-bold">
                  {t('pages.profile.sections.lastOrder.orderStatus')}
                </Typography>
                <br />
                <Typography size={TypographySize.Tiny}>
                  {t(`shopify.deliveryStatus.${lastOrder.displayFulfillmentStatus}`)}
                </Typography>
              </div>
            </div>

            <div className="pt-2 pb-8">
              <Carousel
                slides={lastOrder.lineItems.edges.map((item) => (
                  <OrderTile node={item.node} productId={item.node.product.id} />
                ))}
                tile
              />
            </div>

            {/* <div className="grid gap-4 mb-8">
              <Button emphasis={ButtonEmphasis.Tertiary} center disabled>
                {t('pages.profile.sections.lastOrder.buttonOrderPage')}
              </Button>
              <Button emphasis={ButtonEmphasis.Secondary} center disabled>
                {t('pages.profile.sections.lastOrder.buttonOrderAgain')}
              </Button>
            </div> */}
          </div>
        ) : (
          <div className={`${sectionStyle(true)}`}>
            <Loader />
          </div>
        )}

        <div className={sectionStyle()}>
          <Typography as="h2" type={TypographyType.Heading} size={TypographySize.Tiny}>
            {t('pages.profile.sections.discover.title')}
          </Typography>

          {/* TODO: make this content dynamic from CMS */}
          <div className="grid w-full md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 px-3 py-6 border-b border-brand-grey-bombay md:max-w-sm md:border-0">
              <Link to={'/catalogue?vendor=Nomad'}>
                <img src={CoffeeTaste} className="w-full" />
              </Link>
              <div>
                <Typography as="p" className="mb-4">
                  NOMAD Coffee is our latetest roaster in the catalog!
                </Typography>
                <Button
                  data-testid="button-vendor=Nomad"
                  emphasis={ButtonEmphasis.Secondary}
                  size={ButtonSize.xs}
                  hasArrow
                  arrowOverride={IconName.ArrowRight}
                  onClick={() => navigate('/catalogue?vendor=Nomad')}
                >
                  Explore products
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 px-3 py-6 md:max-w-sm">
              <Link to={'/catalogue?origin=BU'}>
                <img src={Myanmar} className="w-full" />
              </Link>
              <div>
                <Typography as="p" className="mb-4">
                  Discover new complex origins: Myanmar!
                </Typography>
                <Button
                  data-testid="button-origin=BU"
                  emphasis={ButtonEmphasis.Secondary}
                  size={ButtonSize.xs}
                  hasArrow
                  arrowOverride={IconName.ArrowRight}
                  onClick={() => navigate('/catalogue?origin=BU')}
                >
                  Explore products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
