import {
  CurrencyCode,
  Product,
  Product as ProductType,
  ProductVariant,
  ProductVariantConnection,
  WeightUnit,
} from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_PRODUCT = loader('src/graphql/queries/product.query.graphql')

interface ProductMeta {
  value: string | number
}

interface ProductVariantCustom extends ProductVariant {
  grind_type: ProductMeta
  package_size: ProductMeta
}

interface ProductVariantConnectionCustom extends ProductVariantConnection {
  nodes: Array<ProductVariantCustom>
}

interface ProductCustom {
  coffee_type?: ProductMeta
  bean_type?: ProductMeta
  aroma?: ProductMeta
  flavourNotes?: ProductMeta
  sweetness?: ProductMeta
  body?: ProductMeta
  bitterness?: ProductMeta
  acidity?: ProductMeta
  origin?: ProductMeta
  producer?: ProductMeta
  altitude?: ProductMeta
  variety?: ProductMeta
  processing?: ProductMeta
  pricePerKg?: ProductMeta
  decaf?: ProductMeta
  whyThisCoffee?: ProductMeta
  variants: ProductVariantConnectionCustom
  vendor_description?: ProductMeta
  vendor_image?: ProductMeta
}

export const ProductMockDataBase: ProductType = {
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
  descriptionHtml: '<p>Hello world</p>',
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
        id: '123123',
        url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
        originalSrc: '',
        src: '',
        transformedSrc: '',
      },
      {
        id: '123124',
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
  vendor: '60beans',
  metafields: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
}

export const ProductMockData: ProductType = {
  ...ProductMockDataBase,
  variants: {
    edges: [],
    nodes: [
      {
        availableForSale: true,
        currentlyNotInStock: false,
        id: 'gid://shopify/ProductVariant/42737527324888',
        price: '9.99',
        priceV2: {
          amount: '9.99',
          currencyCode: CurrencyCode.Eur,
        },
        metafields: {
          edges: [],
          nodes: [],
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
        product: ProductMockDataBase,
        requiresShipping: true,
        selectedOptions: [],
        sellingPlanAllocations: {
          edges: [],
          nodes: [],
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
        storeAvailability: {
          edges: [],
          nodes: [],
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
        title: 'variant',
        weightUnit: WeightUnit.Kilograms,
      },
    ],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  vendor: '60beans',
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
  coffee_type: {
    value: 'Filter',
  },
  aroma: {
    value: 'experimentell & komplex',
  },
  flavourNotes: {
    value: 'Weiße Schokolade, Melone, Orangenblüten',
  },
  acidity: {
    value: 3,
  },
  bitterness: {
    value: 3,
  },
  body: {
    value: 3,
  },
  sweetness: {
    value: 2,
  },
  origin: {
    value: 'CO',
  },
  producer: {
    value: '60beans',
  },
  altitude: {
    value: '500m',
  },
  variety: {
    value: 'Ethiopian Heirloom',
  },
  processing: {
    value: 'Gewaschen',
  },
  pricePerKg: {
    value: '10.0',
  },
  decaf: {
    value: 'true',
  },
  whyThisCoffee: {
    value:
      'Dein Kaffee ist süß, leicht und trägt einen subtilen Duft, ähnlich wie Blumen. Er bringt fruchtige Töne, helle Säure und einen mittleren bis schweren Körper zusammen',
  },
  vendor_description: {
    value: 'the vendor description text',
  },
  vendor_image: {
    value: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
  },
  variants: {
    ...ProductMockData.variants,
    nodes: [
      {
        ...ProductMockData.variants.nodes[0],
        grind_type: {
          value: 'Ganze Bohne',
        },
        package_size: {
          value: '250g',
        },
      },
      {
        ...ProductMockData.variants.nodes[0],
        grind_type: {
          value: 'Filter',
        },
        package_size: {
          value: '250g',
        },
      },
      {
        ...ProductMockData.variants.nodes[0],
        grind_type: {
          value: 'Ganze Bohne',
        },
        package_size: {
          value: '1000g',
        },
      },
      {
        ...ProductMockData.variants.nodes[0],
        grind_type: {
          value: 'Filter',
        },
        package_size: {
          value: '1000g',
        },
      },
    ],
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
      id: 'gid://shopify/Product/7655228866776',
    },
  },
  result: {
    data: {
      product: ProductMockDataWithCustomMetadata,
    },
  },
}

export const ProductMockWithCustomMetadataNoAroma = {
  request: {
    query: GET_PRODUCT,
    variables: {
      id: 'gid://shopify/Product/7655228866776',
    },
  },
  result: {
    data: {
      product: {
        ...ProductMockDataWithCustomMetadata,
        aroma: null,
      },
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
