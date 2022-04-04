import { CurrencyCode, Product } from '@shopify/hydrogen/dist/esnext/storefront-api-types'

export const ProductMock: Product = {
  availableForSale: false,
  collections: {
    edges: [],
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
    url: 'http://www.myimageurl.com',
    originalSrc: '',
    src: '',
    transformedSrc: '',
  },
  handle: '',
  images: {
    edges: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  media: {
    edges: [],
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
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  seo: {},
  tags: [],
  title: '',
  updatedAt: '',
  variants: {
    edges: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  vendor: '',
  __typename: 'Product',
  id: '12312312',
  metafields: {
    edges: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
}
