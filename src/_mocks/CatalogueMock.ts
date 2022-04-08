import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'
const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')

const ProductEdge1 = {
  node: {
    id: '123456789',
    title: 'Some coffee title',
  },
}

const CatalogueMock1 = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
    },
  },
  result: {
    data: {
      products: {
        edges: [
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
          ProductEdge1,
        ],
      },
    },
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: '123',
      endCursor: '321',
    },
  },
}

const CatalogueMock2 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: 'PRICE',
      reverse: false,
    },
  },
}

const CatalogueMock3 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: 'PRICE',
      reverse: true,
    },
  },
}

const CatalogueMock4 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: 'CREATED_AT',
      reverse: false,
    },
  },
}

const CatalogueMock5 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: 'BEST_SELLING',
      reverse: false,
    },
  },
}

export const CatalogueMocks = [CatalogueMock1, CatalogueMock2, CatalogueMock3, CatalogueMock4, CatalogueMock5]

export const CatalogueMockError = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      first: 6,
      last: null,
      before: null,
      after: null,
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
      first: 6,
      last: null,
      before: null,
      after: null,
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
