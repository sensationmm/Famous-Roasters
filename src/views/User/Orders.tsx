import { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  ErrorPrompt,
  IconName,
  Input,
  Layout,
  Listbox,
  ListBoxItem,
  Loader,
  NavigationTheme,
  OrderTile,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { useAuth } from 'src/config/cognito'
import { formatPrice, getSimplifiedId } from 'src/utils'

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

export type Order = {
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

export const Orders: React.FC = () => {
  const [user] = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>()
  const [ordersError, setOrdersError] = useState<boolean>(false)
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false)
  const [filterOrderId, setFilterOrderId] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<ListBoxItem[]>()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setOrdersLoading(true)
        const token = localStorage.getItem('authToken')
        fetch(process.env.REACT_APP_FAMOUS_ROASTERS_ORDERS_ENDPOINT as string, {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        })
          .then((response) => {
            return response.json()
          })
          .then((res) => {
            if (res.data.orders.edges.length > 0) {
              setOrdersError(false)
              setOrders(res.data.orders.edges)
              setOrdersLoading(false)
            } else {
              setOrdersError(false)
              setOrdersLoading(false)
            }
          })
          .catch(() => {
            setOrdersError(true)
            setOrdersLoading(false)
          })
      })
      .catch(() => {
        navigate('/login')
      })
  }, [user?.isValid])

  useEffect(() => {
    const ordersCopy = orders?.slice() || []

    if (sortOrder) {
      if (sortOrder[0].value === 'newest') {
        ordersCopy.sort((a, b) => (a.id > b.id ? -1 : 1))
      } else {
        ordersCopy.sort((a, b) => (a.id < b.id ? -1 : 1))
      }
      setOrders(ordersCopy)
    }
  }, [sortOrder])

  const ordersToShow = orders?.filter((order) => filterOrderId === '' || order.id.includes(filterOrderId)) || []

  if (ordersError) {
    return <ErrorPrompt />
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex flex-col flex-grow w-full items-start bg-white mt-4y">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8 py-8">
          <div className="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-[1fr_2fr]">
            <div className="border-b border-coreUI-text-tertiary md:border-0 pb-6 mb-6 md:pb-0 md:mb-0">
              <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Small} className="mb-4">
                {t('pages.orders.title')}
              </Typography>
              <Typography as="p" type={TypographyType.Paragraph}>
                {t('pages.orders.intro')}
              </Typography>
            </div>
            <div className="flex flex-col items-end justify-end">
              <Input
                id="filter-ids"
                data-testid="filter-ids"
                type="number"
                labelText=""
                value={filterOrderId}
                onChange={(e) => setFilterOrderId(e.target.value)}
                placeholder="Search for a specific order number"
                icon={IconName.Search}
                className="w-full md:w-[330px] border-coreUI-background-images"
                classNameWrapper="w-full md:w-[330px] mb-4"
                isSmall
              />
              <Listbox
                items={[
                  { name: 'oldest', value: 'oldest' },
                  { name: 'newest', value: 'newest' },
                ]}
                translationPrefix="cta.filters"
                hasTranslatedValues={true}
                className="w-full md:w-auto border-coreUI-background-images"
                isSmall
                value={sortOrder}
                onChange={setSortOrder}
                borderColor="border-coreUI-background-images"
              />
            </div>
          </div>

          {ordersLoading ? (
            <div>
              <div>
                <Loader />
              </div>
            </div>
          ) : (
            <div
              className={`mt-8 max-w-[640px] mx-auto${
                ordersToShow.length === 0 ? ' text-center mb-6 py-6 border-b border-t border-coreUI-text-tertiary' : ''
              }`}
            >
              {ordersToShow.length === 0 ? (
                filterOrderId !== '' ? (
                  <Typography>{t('pages.orders.noOrdersTextFiltered')}</Typography>
                ) : (
                  <Typography>{t('pages.orders.noOrdersText')}</Typography>
                )
              ) : (
                ordersToShow.map((order) => (
                  <div key={`order-${order.id}`} className="mb-4 pb-4 md:mb-6 md:pb-6 border-b border-coreUI-border">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Typography className="block font-bold">Order #{getSimplifiedId(order.id, 'Order')}</Typography>
                        <Typography>
                          {formatPrice(
                            order.totalPriceSet.shopMoney.amount,
                            order.totalPriceSet.shopMoney.currencyCode,
                          )}
                        </Typography>
                      </div>
                      <div>
                        <Typography className="font-bold" size={TypographySize.Small}>
                          {t(`shopify.deliveryStatus.${order.displayFulfillmentStatus}`)}
                        </Typography>
                      </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-6">
                      {order.lineItems.edges.map((item, count) => (
                        <OrderTile
                          key={`order-${order.id}-${count}`}
                          node={item.node}
                          productId={item.node.product.id}
                          showPrice={false}
                          isSmall
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}
