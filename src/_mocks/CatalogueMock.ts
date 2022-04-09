import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

import { ProductMock } from './ProductMock'
const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')

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
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
          {
            node: {
              ...ProductMock,
            },
          },
        ],
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: '111',
          endCursor: '777',
        },
      },
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

const CatalogueMock6 = {
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
        edges: CatalogueMock1.result.data.products.edges,
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: '1',
          endCursor: '2',
        },
      },
    },
  },
}

const CatalogueMock7 = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      first: 6,
      last: null,
      before: null,
      after: '2',
      sortKey: undefined,
      reverse: undefined,
    },
  },
  result: {
    data: {
      products: {
        edges: CatalogueMock1.result.data.products.edges,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: true,
          startCursor: '2',
          endCursor: '3',
        },
      },
    },
  },
}

const CatalogueMock8 = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      first: null,
      last: 6,
      before: '2',
      after: null,
      sortKey: undefined,
      reverse: undefined,
    },
  },
  result: {
    data: {
      products: {
        edges: CatalogueMock1.result.data.products.edges,
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: '1',
          endCursor: '2',
        },
      },
    },
  },
}

export const CatalogueMocks = [
  CatalogueMock1,
  CatalogueMock2,
  CatalogueMock3,
  CatalogueMock4,
  CatalogueMock5,
  CatalogueMock6,
]
export const CatalogueMocksPagination = [CatalogueMock6, CatalogueMock7, CatalogueMock8]

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
