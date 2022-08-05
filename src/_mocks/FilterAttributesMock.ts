import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_FILTER_ATTRIBUTES = loader('src/graphql/queries/filterAttributes.query.graphql')

export const FilterAttributesMock = {
  request: {
    query: GET_FILTER_ATTRIBUTES,
  },
  result: {
    data: {
      filterDictionaries: {
        coffeeTypes: ['Espresso', 'Filter'],
        vendors: ['60beans', 'Cycle Roasters'],
        beanTypes: ['Arabica'],
        origins: ['BR', 'CO'],
        packageSizes: ['250g', '1000g', '500g'],
        aromas: ['Floral & leicht', 'Fruchtig & lebhaft'],
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
