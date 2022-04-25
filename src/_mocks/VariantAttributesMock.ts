import { loader } from 'graphql.macro'

const GET_VARIANTS_ATTRIBUTES = loader('src/graphql/queries/variantsAttributes.query.graphql')

export const VariantAttributesMock = {
  request: {
    query: GET_VARIANTS_ATTRIBUTES,
  },
  result: {
    data: {
      products: {
        nodes: [
          {
            variants: {
              nodes: [
                {
                  package_size: {
                    value: '250g',
                  },
                },
                {
                  package_size: {
                    value: '500g',
                  },
                },
                {
                  package_size: {
                    value: '1000g',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },
}
