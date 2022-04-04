import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'
const query = loader('src/graphql/queries/products.query.graphql')

export const CatalogueMock = {
  request: {
    query,
  },
  result: {
    data: {
      products: {
        edges: [
          {
            node: {
              id: '123456789',
              title: 'Some coffee title',
            },
          },
        ],
      },
    },
  },
}

export const CatalogueMockError = {
  request: {
    query,
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}

export const CatalogueMockMissingData = {
  request: {
    query,
  },
  result: {
    data: {
      products: {
        edges: null,
      },
    },
  },
}
