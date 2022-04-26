import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_PRODUCTS_VARIANTS_ATTRIBUTES = loader('src/graphql/queries/productsVariantsAttributes.query.graphql')

export const ProductsVariantsAttributesMock = {
  request: {
    query: GET_PRODUCTS_VARIANTS_ATTRIBUTES,
  },
  result: {
    data: {
      products: {
        nodes: [
          {
            bean_type: {
              value: 'Arabica',
            },
            origin: {
              value: JSON.stringify({
                countries: ['BR', 'CO'],
              }),
            },
            vendor: 'Cycle Roasters',
            variants: {
              nodes: [
                {
                  package_size: {
                    value: '250g',
                  },
                },
                {
                  package_size: {
                    value: '500g',
                  },
                },
                {
                  package_size: {
                    value: '1000g',
                  },
                },
              ],
            },
          },
          {
            bean_type: {
              value: 'Arabica',
            },
            origin: {
              value: JSON.stringify({
                countries: ['BR', 'CO'],
              }),
            },
            vendor: 'Famous Roasters',
            variants: {
              nodes: [
                {
                  package_size: {
                    value: '250g',
                  },
                },
                {
                  package_size: {
                    value: '500g',
                  },
                },
                {
                  package_size: {
                    value: '1000g',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },
}

export const ProductsVariantsAttributesMockMockError = {
  request: {
    query: GET_PRODUCTS_VARIANTS_ATTRIBUTES,
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}
