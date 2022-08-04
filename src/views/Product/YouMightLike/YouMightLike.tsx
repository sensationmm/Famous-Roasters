import { useQuery } from '@apollo/client/react/hooks'
import {
  Collection,
  Product as ProductType,
  ProductConnection,
} from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React from 'react'
import { Link } from 'react-router-dom'
import { ErrorPrompt, Loader, ProductTile } from 'src/components'
import { shopifyAccessoryCollection, shopifyCoffeeCollection } from 'src/config'
import { getSimplifiedProductId } from 'src/utils/formatters'

interface ProductMeta {
  value: string
}

interface ProductMetaInteger {
  value: number
}

interface ProductCustom extends ProductType {
  coffee_type: ProductMeta
  bean_type: ProductMeta
  aroma: ProductMeta
  flavourNotes: ProductMeta
  sweetness: ProductMetaInteger
  body: ProductMetaInteger
  bitterness: ProductMetaInteger
  acidity: ProductMetaInteger
  pricePerKg: ProductMeta
  origin: ProductMeta
}

interface ProductConnectionCustom extends ProductConnection {
  nodes: Array<ProductCustom>
}

interface CollectionCustom extends Collection {
  products: ProductConnectionCustom
}

interface CollectionQuery {
  collection: CollectionCustom
}

interface YouMightLikeProps {
  productId: string
}

export const YouMightLike: React.FC<YouMightLikeProps> = ({ productId }: YouMightLikeProps) => {
  const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')

  const { loading, error, data } = useQuery<CollectionQuery>(GET_PRODUCTS, {
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: 3,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
    },
  })

  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery<CollectionQuery>(GET_PRODUCTS, {
    variables: {
      collectionId: shopifyAccessoryCollection,
      first: 3,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
      // filters: { productType: 'Accessories' },
    },
  })

  const resultsCoffee = data?.collection?.products.nodes || []
  const resultsAccessories = data2?.collection?.products.nodes || []
  const results = resultsCoffee.concat(resultsAccessories).sort(() => Math.random() - 0.5)

  const productNodes = results.filter((node) => getSimplifiedProductId(node.id) !== productId)

  const pageInfo = data?.collection?.products.pageInfo || {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  }

  if (loading || loading2) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (error || error2 || !pageInfo) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {productNodes?.map((node, i: number) => {
        const id = getSimplifiedProductId(node.id)
        return (
          <Link to={`/product/${id}`} key={`product-tile-link-${i}`}>
            <ProductTile key={`title-${i}`} productNode={node} />
          </Link>
        )
      })}
    </div>
  )
}
