import { CartQueryQuery } from '@shopify/hydrogen/dist/esnext/components/CartProvider/graphql/CartQuery'
import { CountryCode, CurrencyCode } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_CART = loader('src/graphql/queries/cart.query.graphql')

export const CartMockData: CartQueryQuery = {
  cart: {
    id: 'gid://shopify/Cart/123456789',
    checkoutUrl: 'https://famousroasters.myshopify.com/cart/c/123456789',
    buyerIdentity: {
      countryCode: CountryCode.De,
      email: '',
      phone: '',
    },
    attributes: [],
    discountCodes: [],
    estimatedCost: {
      subtotalAmount: {
        amount: '10',
        currencyCode: CurrencyCode.Eur,
      },
      totalAmount: {
        amount: '10',
        currencyCode: CurrencyCode.Eur,
      },
    },
    lines: {
      edges: [
        {
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
              },
              priceV2: {
                amount: '7.2',
                currencyCode: CurrencyCode.Eur,
              },
              product: {
                title: 'Cycle Blend',
                handle: '',
                id: 'gid://shopify/Product/7655228866776',
              },
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
      id: 'gid://shopify/Cart/123456789',
    },
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}
