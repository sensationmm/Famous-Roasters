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
            vendor: 'Cycle Roasters',
            coffee_type: {
              value: 'Filter',
            },
            aroma: {
              value: 'Floral & leicht',
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
            vendor: '60beans',
            coffee_type: {
              value: 'Espresso',
            },
            aroma: {
              value: 'Fruchtig & lebhaft',
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
