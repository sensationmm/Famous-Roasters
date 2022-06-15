import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_FILTER_ATTRIBUTES = loader('src/graphql/queries/filterAttributes.query.graphql')

export const FilterAttributesMock = {
  request: {
    query: GET_FILTER_ATTRIBUTES,
  },
  result: {
    data: {
      products: {
        nodes: [
          {
            id: '123123',
            coffee_type: {
              value: 'Filter',
            },
            bean_type: {
              value: 'Arabica',
            },
            origin: {
              value: 'BR,CO',
            },
            decaf: {
              value: 'false',
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
            id: '123124',
            coffee_type: {
              value: 'Espresso',
            },
            bean_type: {
              value: 'Arabica',
            },
            origin: {
              value: 'BR,CO',
            },
            decaf: {
              value: 'true',
            },
            vendor: 'WeBean',
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

export const FilterAttributesMockError = {
  request: {
    query: GET_FILTER_ATTRIBUTES,
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}
