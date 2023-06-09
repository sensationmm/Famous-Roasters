/* eslint-disable  @typescript-eslint/no-explicit-any */
/* Needed because @shopify/hydrogen/dist/next/storefront-api-types isnt available in production */
import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_CART = loader('src/graphql/queries/cart.query.graphql')
const GET_CART_CREATE = loader('src/graphql/queries/cartCreate.mutation.graphql')
const GET_CART_LINES_ADD = loader('src/graphql/queries/cartLinesAdd.mutation.graphql')
const GET_CART_LINES_UPDATE = loader('src/graphql/queries/cartLinesUpdate.mutation.graphql')
const GET_CART_LINES_REMOVE = loader('src/graphql/queries/cartLinesRemove.mutation.graphql')

const CartLineEdgeMockData: any = {
  node: {
    id: 'gid://shopify/CartLine/9876543210',
    attributes: [],
    quantity: 1,
    merchandise: {
      __typename: 'ProductVariant',
      id: 'gid://shopify/ProductVariant/456789',
      title: 'Cycle Blend',
      availableForSale: true,
      requiresShipping: true,
      image: {
        altText: null,
        url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
        originalSrc: '',
        src: '',
        transformedSrc: '',
      },
      priceV2: {
        amount: '7.2',
        currencyCode: 'EUR',
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      product: {
        title: 'Cycle Blend',
        handle: '',
        id: 'gid://shopify/Product/7655228866776',
        vendor: 'Cycle Roasters',
        isGiftCard: false,
      },
      grind_type: {
        value: 'Ganze Bohne'
      },
      package_size: {
        value: '250g'
      },
      equipmentvariant: null,
      selectedOptions: [
        {
          name: 'Gewicht',
          value: '250g',
        },
        {
          name: 'Mahlgrad',
          value: 'Ganze Bohne',
        },
      ],
    },
  },
}

export const CartMockData: any = {
  cart: {
    id: 'gid://shopify/Cart/123456789',
    checkoutUrl: 'https://famousroasters.myshopify.com/cart/c/123456789',
    buyerIdentity: {
      countryCode: 'DE',
      email: '',
      phone: '',
    },
    attributes: [],
    discountCodes: [],
    cost: {
      subtotalAmount: {
        amount: '10',
        currencyCode: 'EUR',
      },
      totalAmount: {
        amount: '10',
        currencyCode: 'EUR',
      },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    estimatedCost: {
      subtotalAmount: {
        amount: '10',
        currencyCode: 'EUR',
      },
      totalAmount: {
        amount: '10',
        currencyCode: 'EUR',
      },
    },
    totalQuantity: 0,
    lines: {
      edges: [
        CartLineEdgeMockData,
        {
          node: {
            ...CartLineEdgeMockData.node,
            id: 'gid://shopify/CartLine/898768978',
            quantity: 2,
            merchandise: {
              ...CartLineEdgeMockData.node.merchandise,
              id: 'gid://shopify/ProductVariant/879887',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              product: {
                title: '60beans',
                handle: 'espresso-raritaten-set',
                id: 'gid://shopify/Product/7655228866776',
                vendor: 'Cycle Roasters 2',
                isGiftCard: false,
              },
              grind_type: {
                value: 'Ganze Bohne'
              },
              package_size: {
                value: '1000g'
              },
              equipmentvariant: null,
              selectedOptions: [
                {
                  name: 'Gewicht',
                  value: '1000g',
                },
                {
                  name: 'Mahlgrad',
                  value: 'Ganze Bohne',
                },
              ],
            },
          },
        },
      ],
    },
  },
}

export const CartMock = {
  request: {
    query: GET_CART,
    variables: {
      id: 'gid://shopify/Cart/123456789',
    },
  },
  result: {
    data: CartMockData,
  },
}

export const CartMockError = {
  request: {
    query: GET_CART,
    variables: {
      wrong: '123123',
    },
  },
  data: null,
  result: {
    errors: [new GraphQLError('Error!')],
  },
}

export const CartLinesUpdateMock = {
  request: {
    query: GET_CART_LINES_UPDATE,
    variables: {
      cartId: 'gid://shopify/Cart/123456789',
      lines: [
        {
          id: 'gid://shopify/CartLine/9876543210',
          quantity: 2,
        },
      ],
    },
  },
  result: {
    data: {
      cartLinesUpdate: {
        ...CartMockData,
        cart: {
          ...CartMockData.cart,
          lines: {
            ...CartMockData.cart?.lines,
            edges: [
              {
                node: {
                  ...CartMockData.cart?.lines.edges[0].node,
                  quantity: 2,
                },
              },
              {
                ...CartMockData.cart?.lines.edges[1],
              },
            ],
          },
        },
        userErrors: null,
      },
    },
  },
}

export const CartLinesRemoveMock = {
  request: {
    query: GET_CART_LINES_REMOVE,
    variables: {
      cartId: 'gid://shopify/Cart/123456789',
      lineIds: ['gid://shopify/CartLine/9876543210'],
    },
  },
  result: {
    data: {
      cartLinesRemove: {
        ...CartMockData,
        cart: {
          ...CartMockData.cart,
          lines: {
            ...CartMockData.cart?.lines,
            edges: [
              {
                ...CartMockData.cart?.lines.edges[1],
              },
            ],
          },
        },
        userErrors: null,
      },
    },
  },
}

export const CartLinesRemoveMock2 = {
  request: {
    query: GET_CART_LINES_REMOVE,
    variables: {
      cartId: 'gid://shopify/Cart/123456789',
      lineIds: ['gid://shopify/CartLine/898768978'],
    },
  },
  result: {
    data: {
      cartLinesRemove: {
        ...CartMockData,
        cart: {
          ...CartMockData.cart,
          lines: {
            edges: [],
          },
        },
        userErrors: null,
      },
    },
  },
}

export const CartCreateMock = {
  request: {
    query: GET_CART_CREATE,
    variables: {
      input: {
        lines: [
          {
            quantity: 1,
            merchandiseId: 'gid://shopify/ProductVariant/42737527324888',
          },
        ],
      },
    },
  },
  result: {
    data: {
      cartCreate: {
        cart: {
          ...CartMockData.cart,
          lines: {
            ...CartMockData.cart?.lines,
            edges: [
              {
                ...CartMockData.cart?.lines.edges[0],
              },
            ],
          },
        },
        userErrors: null,
      },
    },
  },
}

export const CartAddLinesMock = {
  request: {
    query: GET_CART_LINES_ADD,
    variables: {
      cartId: 'gid://shopify/Cart/123456789',
      lines: [
        {
          quantity: 1,
          merchandiseId: 'gid://shopify/ProductVariant/42737527324888',
        },
      ],
    },
  },
  result: {
    data: {
      cartLinesAdd: {
        ...CartMockData,
        cart: {
          ...CartMockData.cart,
          lines: {
            ...CartMockData.cart?.lines,
            edges: [
              {
                node: {
                  ...CartMockData.cart?.lines.edges[0].node,
                  quantity: 2,
                },
              },
              {
                ...CartMockData.cart?.lines.edges[1],
              },
            ],
          },
        },
        userErrors: null,
      },
    },
  },
}
