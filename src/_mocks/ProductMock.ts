import { CurrencyCode, Product, Product as ProductType } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_PRODUCT = loader('src/graphql/queries/product.query.graphql')

interface ProductMeta {
  value: string | number
}

interface ProductCustom {
  bean_type?: ProductMeta
  aroma?: ProductMeta
  sweetness?: ProductMeta
  body?: ProductMeta
  bitterness?: ProductMeta
  acidity?: ProductMeta
}

export const ProductMockData: ProductType = {
  availableForSale: false,
  collections: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: '9.99',
      currencyCode: CurrencyCode.Eur,
    },
    minVariantPrice: {
      amount: '19.99',
      currencyCode: CurrencyCode.Eur,
    },
  },
  createdAt: '',
  description: '',
  descriptionHtml: '',
  featuredImage: {
    url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
    originalSrc: '',
    src: '',
    transformedSrc: '',
  },
  handle: '',
  id: 'gid://shopify/Product/7655228866776',
  images: {
    edges: [],
    nodes: [
      {
        url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
        originalSrc: '',
        src: '',
        transformedSrc: '',
      },
      {
        url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
        originalSrc: '',
        src: '',
        transformedSrc: '',
      },
    ],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  media: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  options: [],
  priceRange: {
    maxVariantPrice: {
      amount: '9.99',
      currencyCode: CurrencyCode.Eur,
    },
    minVariantPrice: {
      amount: '19.99',
      currencyCode: CurrencyCode.Eur,
    },
  },
  productType: '',
  publishedAt: '',
  requiresSellingPlan: false,
  sellingPlanGroups: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  seo: {},
  tags: [],
  title: 'Espresso Raritäten Set',
  updatedAt: '',
  variants: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  vendor: 'Famous Roasters',
  metafields: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
}

export const ProductMockDataWithCustomMetadata: ProductType & ProductCustom = {
  ...ProductMockData,
  images: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  bean_type: {
    value: 'Arabica',
  },
  aroma: {
    value: 'experimentell & komplex',
  },
}

export const ProductMockDataNoImage: Product = {
  ...ProductMockData,
  featuredImage: null,
}

export const ProductMock = {
  request: {
    query: GET_PRODUCT,
    variables: {
      id: 'gid://shopify/Product/123456',
    },
  },
  result: {
    data: {
      product: ProductMockData,
    },
  },
}

export const ProductMockWithCustomMetadata = {
  request: {
    query: GET_PRODUCT,
    variables: {
      id: 'gid://shopify/Product/123456',
    },
  },
  result: {
    data: {
      product: ProductMockDataWithCustomMetadata,
    },
  },
}

export const ProductMockError = {
  request: {
    query: GET_PRODUCT,
    variables: {
      id: 'gid://shopify/Product/123456',
    },
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}
