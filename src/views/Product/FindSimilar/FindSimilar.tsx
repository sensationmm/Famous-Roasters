import { useQuery } from '@apollo/client/react/hooks'
import { Collection, ProductConnection } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React from 'react'
import { Link } from 'react-router-dom'
import { ErrorPrompt, Loader, ProductTile } from 'src/components'
import { shopifyCoffeeCollection } from 'src/config'
import { getSimplifiedId } from 'src/utils/formatters'

import { ProductCustom } from '../Product'

interface ProductConnectionCustom extends ProductConnection {
  nodes: Array<ProductCustom>
}

interface CollectionCustom extends Collection {
  products: ProductConnectionCustom
}

interface CollectionQuery {
  collection: CollectionCustom
}

const totalItemsPerPage = 4

interface FindSimilarProps {
  aroma: string
  productId: string
}

export const FindSimilar: React.FC<FindSimilarProps> = ({ aroma, productId }: FindSimilarProps) => {
  const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')

  const { loading, error, data } = useQuery<CollectionQuery>(GET_PRODUCTS, {
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: totalItemsPerPage,
      last: null,
      before: null,
      after: null,
      sortKey: 'BEST_SELLING',
      reverse: undefined,
      filters: { productMetafield: { namespace: 'my_fields', key: 'aroma', value: `${aroma}` } },
    },
  })

  const productNodes = data?.collection?.products.nodes
    .filter((node) => getSimplifiedId(node.id) !== productId)
    .slice(0, 3)

  const pageInfo = data?.collection?.products.pageInfo || {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  }

  if (loading) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (error || !pageInfo) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-10">
      {productNodes?.map((node, i: number) => {
        const id = getSimplifiedId(node.id)
        return (
          <Link to={`/product/${id}`} key={`product-tile-link-${i}`}>
            <ProductTile key={`title-${i}`} productNode={node} />
          </Link>
        )
      })}
    </div>
  )
}
