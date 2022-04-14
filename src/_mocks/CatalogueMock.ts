import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

import { ProductMock } from './ProductMock'
const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')

const ProductNode = {
  ...ProductMock,
  pricePerKg: {
    value: '10.0',
  },
}

const ProductNodes = Array.from(Array(12).keys()).map(() => ProductNode)

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
        nodes: [...ProductNodes],
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
        nodes: [...ProductNodes],
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
        nodes: [...ProductNodes],
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
        nodes: [...ProductNodes],
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

const CatalogueMock9 = {
  ...CatalogueMock6,
  result: {
    ...CatalogueMock6.result,
    data: {
      products: {
        ...CatalogueMock6.result.data.products,
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
      },
    },
  },
}

const CatalogueMock10 = {
  ...CatalogueMock7,
  result: {
    ...CatalogueMock7.result,
    data: {
      products: {
        ...CatalogueMock7.result.data.products,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: true,
          startCursor: null,
          endCursor: null,
        },
      },
    },
  },
}

const CatalogueMock11 = {
  ...CatalogueMock8,
  result: {
    ...CatalogueMock8.result,
    data: {
      products: {
        ...CatalogueMock8.result.data.products,
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
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

export const CatalogueMocksPaginationWrongForwards = [CatalogueMock9, CatalogueMock10, CatalogueMock11]

export const CatalogueMocksPaginationWrongBackwards = [CatalogueMock6, CatalogueMock10, CatalogueMock11]

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
