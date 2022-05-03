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
            bean_type: {
              value: 'Arabica',
            },
            origin: {
              value: 'BR,CO',
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
              value: 'BR,CO',
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

export const FilterAttributesMockError = {
  request: {
    query: GET_FILTER_ATTRIBUTES,
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}
