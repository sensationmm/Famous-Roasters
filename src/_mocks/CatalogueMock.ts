import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'
import { shopifyAccessoryCollection, shopifyCoffeeCollection } from 'src/config'

import { ProductMockDataWithCustomMetadata } from './ProductMock'
const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')

const ProductNode = {
  ...ProductMockDataWithCustomMetadata,
  productType: 'Expresso',
  extraDescription: {
    value: '',
  },
  pricePerKg: {
    value: '10.0',
  },
}

const ProductNodes = Array.from(Array(12).keys()).map(() => ProductNode)

const CatalogueMock1 = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: undefined,
    },
  },
  result: {
    data: {
      collection: {
        id: 'abcdef',
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
  },
}

const CatalogueMock2 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: 'PRICE',
      reverse: undefined,
      filters: undefined,
    },
  },
}

const CatalogueMock3 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: 'PRICE',
      reverse: true,
      filters: undefined,
    },
  },
}

const CatalogueMock4 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: 'CREATED',
      reverse: undefined,
      filters: undefined,
    },
  },
}

const CatalogueMock5 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: 'BEST_SELLING',
      reverse: undefined,
      filters: undefined,
    },
  },
}

const CatalogueMock6 = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: undefined,
    },
  },
  result: {
    data: {
      collection: {
        id: 'abcdef',
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
  },
}

const CatalogueMock7 = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: 6,
      last: null,
      before: null,
      after: '2',
      sortKey: undefined,
      reverse: undefined,
      filters: undefined,
    },
  },
  result: {
    data: {
      collection: {
        id: 'abcdef',
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
  },
}

const CatalogueMock8 = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: null,
      last: 6,
      before: '2',
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: undefined,
    },
  },
  result: {
    data: {
      collection: {
        id: 'abcdef',
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

export const CatalogueMockSimilar = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: 4,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: { productMetafield: { namespace: 'my_fields', key: 'aroma', value: 'experimentell & komplex' } },
    },
  },
  result: {
    data: {
      collection: {
        id: 'abcdef',
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
  },
}

export const CatalogueMockRandom = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: 10,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
    },
  },
  result: {
    data: {
      collection: {
        id: 'abcdef',
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
  },
}

export const CatalogueMockAccessories = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      collectionId: shopifyAccessoryCollection,
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
      collection: {
        id: 'abcdef',
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
  },
}

export const CatalogueMockAccessoriesYouMightLike = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      collectionId: shopifyAccessoryCollection,
      first: 10,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
    },
  },
  result: {
    data: {
      collection: {
        id: 'abcdef',
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
  },
}

export const CatalogueMockFilter1 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ productMetafield: { namespace: 'my_fields', key: 'bean_type', value: 'Arabica' } }],
    },
  },
}

export const CatalogueMockFilter2 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ productVendor: '60beans' }],
    },
  },
}

export const CatalogueMockFilter3 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ productMetafield: { namespace: 'my_fields', key: 'origin', value: 'BR' } }],
    },
  },
}

export const CatalogueMockFilter4 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ variantMetafield: { namespace: 'my_fields', key: 'package_size', value: '250g' } }],
    },
  },
}

export const CatalogueMockFilter5 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ productVendor: 'Cycle Roasters' }],
    },
  },
}

export const CatalogueMockFilter6 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ productMetafield: { namespace: 'my_fields', key: 'coffee_type', value: 'Espresso' } }],
    },
  },
}

export const CatalogueMockFilter7 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ productVendor: '60beans' }, { productVendor: 'Cycle Roasters' }],
    },
  },
}

export const CatalogueMockFilter8 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ productMetafield: { namespace: 'my_fields', key: 'decaf', value: 'true' } }],
    },
  },
}

export const CatalogueMockFilter9 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ productMetafield: { namespace: 'my_fields', key: 'aroma', value: 'Floral & leicht' } }],
    },
  },
}

export const CatalogueMockFilter10 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: undefined,
    },
  },
}

export const CatalogueMockFilter11 = {
  ...CatalogueMock1,
  request: {
    ...CatalogueMock1.request,
    variables: {
      ...CatalogueMock1.request.variables,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: [{ productMetafield: { namespace: 'my_fields', key: 'accessory_type', value: 'Refills' } }],
    },
  },
}

export const CatalogueMocksFilters = [
  CatalogueMockFilter1,
  CatalogueMockFilter2,
  CatalogueMockFilter3,
  CatalogueMockFilter4,
  CatalogueMockFilter5,
  CatalogueMockFilter6,
  CatalogueMockFilter7,
  CatalogueMockFilter8,
  CatalogueMockFilter9,
  CatalogueMockFilter10,
  CatalogueMockFilter11,
]

export const CatalogueMocksPagination = [CatalogueMock6, CatalogueMock7, CatalogueMock8]

export const CatalogueMockError = {
  request: {
    query: GET_PRODUCTS,
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: undefined,
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
      collectionId: shopifyCoffeeCollection,
      first: 6,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      filters: undefined,
    },
  },
  result: {
    data: {
      collection: {
        products: {
          edges: null,
        },
      },
    },
  },
}
