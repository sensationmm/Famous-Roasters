import { CurrencyCode, Product, WeightUnit } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'
import { ProductCustom } from 'src/views/Product/Product'
const GET_PRODUCT = loader('src/graphql/queries/product.query.graphql')

export const ProductMockDataBase: ProductCustom = {
  id: 'gid://shopify/Product/7655228866776',
  title: 'Espresso Raritäten Set',
  productType: 'Espresso',
  vendor: '60beans',
  totalInventory: 100,
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
  descriptionHtml: '<p>Hello world</p>',
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
  featuredImage: {
    url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
    originalSrc: '',
    src: '',
    transformedSrc: '',
  },
  handle: '',
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
  updatedAt: '',
  variants: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  metafields: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
}

export const AccessoryMockDataBase: ProductCustom = {
  id: 'gid://shopify/Product/7968366166282',
  title: 'Barista Pinsel | barista.tools',
  productType: 'Accessories',
  vendor: 'Johann Jacobs Haus',
  priceRange: {
    minVariantPrice: {
      amount: '28.5',
      currencyCode: CurrencyCode.Eur,
    },
    maxVariantPrice: {
      amount: '28.5',
      currencyCode: CurrencyCode.Eur,
    },
  },
  description: '',
  descriptionHtml:
    '<p>Der Naturhaarpinsel von barista.tools ist ideal für das Reinigen des Siebträgers und des Bereichs rund um die Mühle. Gerade für die Arbeit im professionellen Bereich ist dies der optimale Mühlenpinsel - optisch ansprechend, praktisch um schnell Kaffeekrümmel von der Mühle oder dem Arbeitsbereich zu entfernen und liegt gut in der Hand.</p>\n<p>Das Naturhaar ist hitzebeständig und der Pinsel langlebig verarbeitet.</p>\n<p> </p>',
  whyThisCoffee: {
    value: '',
  },
  decaf: undefined,
  variants: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  images: {
    edges: [],
    nodes: [
      {
        id: '12345',
        url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/baristatools-barista-pinsel-fur-muhle-und-siebtrager-baristatools-341875_20copy.webp?v=1655308319',
        originalSrc: '',
        src: '',
        transformedSrc: '',
      },
      {
        id: '23456',
        url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/baristatools-barista-pinsel-fur-muhle-und-siebtrager-baristatools-263505_20copy.webp?v=1655308319',
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
  metafields: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  availableForSale: true,
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
      amount: '28.5',
      currencyCode: CurrencyCode.Eur,
    },
    minVariantPrice: {
      amount: '28.5',
      currencyCode: CurrencyCode.Eur,
    },
  },
  createdAt: '',
  handle: '',
  media: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  options: [],
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
  updatedAt: '',
  vendor_description: undefined,
}

export const AccessoryMockDataBaseWithVariant: ProductCustom = {
  ...AccessoryMockDataBase,
  extraDescription: {
    value: '',
  },
  variants: {
    edges: [],
    nodes: [
      {
        id: 'gid://shopify/ProductVariant/43570607653130',
        availableForSale: true,
        price: '28.50',
        package_size: {
          value: '300g',
        },
        color: {
          value: '',
        },
        grind_type: {
          value: '',
        },
        metafields: {
          edges: [],
          nodes: [],
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
        currentlyNotInStock: false,
        priceV2: {
          amount: '9.99',
          currencyCode: CurrencyCode.Eur,
        },
        product: AccessoryMockDataBase,
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
  accessory_type: {
    value: 'Tamper',
  },
}

export const ProductMockData: ProductCustom = {
  ...ProductMockDataBase,
  variants: {
    ...ProductMockDataBase.variants,
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
        package_size: {
          value: '',
        },
        color: {
          value: '',
        },
      },
    ],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  vendor: '60beans',
  totalInventory: 100,
  metafields: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
}

export const ProductMockDataWithCustomMetadata: ProductCustom = {
  ...ProductMockData,
  extraDescription: {
    value: '',
  },
  productType: 'sadad',
  vendor_description: {
    value: 'the vendor description text',
  },
  aroma: {
    value: 'experimentell & komplex',
  },
  flavourNotes: {
    value: 'Weiße Schokolade, Melone, Orangenblüten',
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
  sweetness: {
    value: 2,
  },
  body: {
    value: 3,
  },
  bitterness: {
    value: 3,
  },
  acidity: {
    value: 3,
  },
  bean_type: {
    value: 'Arabica',
  },
  coffee_type: {
    value: 'Filter',
  },
  accessory_type: {
    value: '',
  },
  origin: {
    value: 'CO',
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
        color: {
          value: '',
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
        color: {
          value: '',
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
        color: {
          value: '',
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
        color: {
          value: '',
        },
      },
    ],
  },
  images: {
    edges: [],
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  totalInventory: 1000,
  vendor_image: {
    value: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
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

export const ProductMockAccessory = {
  request: {
    query: GET_PRODUCT,
    variables: {
      id: 'gid://shopify/Product/7655228866776',
    },
  },
  result: {
    data: {
      product: AccessoryMockDataBaseWithVariant,
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
