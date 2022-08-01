import { loader } from 'graphql.macro'
const ORDERS = loader('src/graphql/queries/orders.query.graphql')
const ORDER = loader('src/graphql/queries/order.query.graphql')

export const OrdersMock = {
  request: {
    query: ORDERS,
  },
  result: {
    data: {
      orders: [
        {
          id: '123456',
          shopifyId: '123456',
        },
        {
          id: '234567',
          shopifyId: '234567',
        },
        {
          id: '345678',
          shopifyId: '345678',
        },
      ],
    },
  },
}

export const OrderMock = {
  request: {
    query: ORDER,
  },
  result: {
    data: {
      order: {
        id: 'gid://shopify/Order/5104381690122',
        name: '#131140',
        createdAt: '2022-07-26T10:06:15Z',
        displayFulfillmentStatus: 'FULFILLED',
        displayFinancialStatus: 'PAID',
        totalPriceSet: {
          shopMoney: {
            amount: '17.1',
            currencyCode: 'EUR',
          },
        },
        discountCode: 'BCGDV',
        lineItems: {
          edges: [
            {
              node: {
                id: 'gid://shopify/LineItem/12718816166154',
                title: 'Wild At Heart',
                image: {
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/19grams_Wild_At_Heart_3782237a-8643-42da-93d4-15849d5c0d4d_20copy.webp?v=1655308036',
                },
                quantity: 1,
                variant: {
                  id: 'gid://shopify/ProductVariant/42737539481816',
                  title: '250g / ganze Bohne',
                  price: '11.90',
                  weight: 250,
                },
              },
            },
            {
              node: {
                id: 'gid://shopify/LineItem/12718816198922',
                title: 'Chakra Warmi',
                image: {
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/CHAKRA-WARMI_Square-scaled.webp?v=1657545324',
                },
                quantity: 1,
                variant: {
                  id: 'gid://shopify/ProductVariant/43608366481674',
                  title: 'Default Title',
                  price: '14.50',
                  weight: 270,
                },
              },
            },
          ],
        },
      },
    },
  },
}
