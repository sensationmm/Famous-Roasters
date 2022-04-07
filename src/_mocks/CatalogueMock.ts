import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'
const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')

export const CatalogueMock = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      first: 20,
      sortKey: undefined,
      reverse: undefined,
    },
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
    query: GET_PRODUCTS,
    variables: {
      first: 20,
      sortKey: undefined,
      reverse: undefined,
    },
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}

export const CatalogueMockMissingData = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      first: 20,
      sortKey: undefined,
      reverse: undefined,
    },
  },
  result: {
    data: {
      products: {
        edges: null,
      },
    },
  },
}
