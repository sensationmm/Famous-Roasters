import { loader } from 'graphql.macro'
const ORDERS = loader('src/graphql/queries/orders.query.graphql')
const ORDER = loader('src/graphql/queries/order.query.graphql')

export const OrderMock = {
  request: {
    query: ORDER,
  },
  result: {
    data: {
      orders: {
        edges: [
          {
            node: {
              id: 'gid://shopify/Order/895370',
              name: '#131197',
              createdAt: '2022-08-11T13:37:56Z',
              displayFulfillmentStatus: 'FULFILLED',
              displayFinancialStatus: 'PAID',
              totalPriceSet: {
                shopMoney: {
                  amount: '3.9',
                  currencyCode: 'EUR',
                },
              },
              discountCode: 'BCG_DV',
              lineItems: {
                edges: [
                  {
                    node: {
                      id: 'gid://shopify/LineItem/12770454372618',
                      title: 'Cycle Blend',
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/specialty-coffee-espresso-cycle-blend-cycle-roasters-lubeck_20copy.webp?v=1655307920',
                      },
                      quantity: 1,
                      product: {
                        id: 'gid://shopify/Product/7655228899544',
                      },
                      variant: {
                        id: 'gid://shopify/ProductVariant/43655916421386',
                        title: '250g / Ganze Bohne',
                        price: '7.20',
                        weight: 250.0,
                        product: {
                          id: 'gid://shopify/Product/7655228899544',
                        },
                      },
                    },
                  },
                  {
                    node: {
                      id: 'gid://shopify/LineItem/12766730879242',
                      title: 'Santiago',
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/SANTIAGO_Filter.webp?v=1657875982',
                      },
                      quantity: 1,
                      product: {
                        id: 'gid://shopify/Product/7659914100952',
                      },
                      variant: {
                        id: 'gid://shopify/ProductVariant/43655917502730',
                        title: '250g / Ganze Bohne',
                        price: '9.50',
                        weight: 0.3,
                        product: {
                          id: 'gid://shopify/Product/7659914100952',
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
}

const OrderMock1 = {
  request: {
    query: ORDER,
  },
  result: {
    data: {
      orders: {
        edges: [
          {
            node: {
              id: 'gid://shopify/Order/895371',
              name: '#131197',
              createdAt: '2022-08-11T13:37:56Z',
              displayFulfillmentStatus: 'FULFILLED',
              displayFinancialStatus: 'PAID',
              totalPriceSet: {
                shopMoney: {
                  amount: '3.9',
                  currencyCode: 'EUR',
                },
              },
              discountCode: 'BCG_DV',
              lineItems: {
                edges: [
                  {
                    node: {
                      id: 'gid://shopify/LineItem/12770454372618',
                      title: 'Cycle Blend',
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/specialty-coffee-espresso-cycle-blend-cycle-roasters-lubeck_20copy.webp?v=1655307920',
                      },
                      quantity: 1,
                      product: {
                        id: 'gid://shopify/Product/7655228899544',
                      },
                      variant: {
                        id: 'gid://shopify/ProductVariant/43655916421386',
                        title: '250g / Ganze Bohne',
                        price: '7.20',
                        weight: 250.0,
                        product: {
                          id: 'gid://shopify/Product/7655228899544',
                        },
                      },
                    },
                  },
                  {
                    node: {
                      id: 'gid://shopify/LineItem/12766730879242',
                      title: 'Santiago',
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/SANTIAGO_Filter.webp?v=1657875982',
                      },
                      quantity: 2,
                      product: {
                        id: 'gid://shopify/Product/7659914100952',
                      },
                      variant: {
                        id: 'gid://shopify/ProductVariant/43655917502730',
                        title: '250g / Ganze Bohne',
                        price: '9.50',
                        weight: 0.3,
                        product: {
                          id: 'gid://shopify/Product/7659914100952',
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
}

const OrderMock2 = {
  request: {
    query: ORDER,
  },
  result: {
    data: {
      orders: {
        edges: [
          {
            node: {
              id: 'gid://shopify/Order/895372',
              name: '#131197',
              createdAt: '2022-08-11T13:37:56Z',
              displayFulfillmentStatus: 'FULFILLED',
              displayFinancialStatus: 'PAID',
              totalPriceSet: {
                shopMoney: {
                  amount: '3.9',
                  currencyCode: 'EUR',
                },
              },
              discountCode: 'BCG_DV',
              lineItems: {
                edges: [
                  {
                    node: {
                      id: 'gid://shopify/LineItem/12770454372618',
                      title: 'Cycle Blend',
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/specialty-coffee-espresso-cycle-blend-cycle-roasters-lubeck_20copy.webp?v=1655307920',
                      },
                      quantity: 1,
                      product: {
                        id: 'gid://shopify/Product/7655228899544',
                      },
                      variant: {
                        id: 'gid://shopify/ProductVariant/43655916421386',
                        title: '250g / Ganze Bohne',
                        price: '7.20',
                        weight: 250.0,
                        product: {
                          id: 'gid://shopify/Product/7655228899544',
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
}

const OrderMock3 = {
  request: {
    query: ORDER,
  },
  result: {
    data: {
      orders: {
        edges: [
          {
            node: {
              id: 'gid://shopify/Order/895373',
              name: '#131197',
              createdAt: '2022-08-11T13:37:56Z',
              displayFulfillmentStatus: 'FULFILLED',
              displayFinancialStatus: 'PAID',
              totalPriceSet: {
                shopMoney: {
                  amount: '3.9',
                  currencyCode: 'EUR',
                },
              },
              discountCode: 'BCG_DV',
              lineItems: {
                edges: [
                  {
                    node: {
                      id: 'gid://shopify/LineItem/12770454372618',
                      title: 'Cycle Blend',
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/specialty-coffee-espresso-cycle-blend-cycle-roasters-lubeck_20copy.webp?v=1655307920',
                      },
                      quantity: 1,
                      product: {
                        id: 'gid://shopify/Product/7655228899544',
                      },
                      variant: {
                        id: 'gid://shopify/ProductVariant/43655916421386',
                        title: '250g / Ganze Bohne',
                        price: '7.20',
                        weight: 250.0,
                        product: {
                          id: 'gid://shopify/Product/7655228899544',
                        },
                      },
                    },
                  },
                  {
                    node: {
                      id: 'gid://shopify/LineItem/12766730879242',
                      title: 'Santiago',
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/SANTIAGO_Filter.webp?v=1657875982',
                      },
                      quantity: 1,
                      product: {
                        id: 'gid://shopify/Product/7659914100952',
                      },
                      variant: {
                        id: 'gid://shopify/ProductVariant/43655917502730',
                        title: '250g / Ganze Bohne',
                        price: '9.50',
                        weight: 0.3,
                        product: {
                          id: 'gid://shopify/Product/7659914100952',
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
}

export const OrdersMock = {
  request: {
    query: ORDERS,
  },
  result: {
    data: {
      orders: {
        edges: [
          OrderMock.result.data.orders.edges[0].node,
          OrderMock2.result.data.orders.edges[0].node,
          OrderMock1.result.data.orders.edges[0].node,
          OrderMock3.result.data.orders.edges[0].node,
        ],
      },
    },
  },
}
