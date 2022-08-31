import { useQuery } from '@apollo/client/react/hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { Link } from 'react-router-dom'
import { ErrorPrompt, Loader, ProductTile } from 'src/components'
import { shopifyAccessoryCollection, shopifyCoffeeCollection } from 'src/config'
import useBreakpoint from 'src/hooks/useBreakpoint'
import { getSimplifiedId } from 'src/utils/formatters'
import { CollectionQuery } from 'src/views/Catalogue'

interface YouMightLikeProps {
  productId: string
}

export const YouMightLike: React.FC<YouMightLikeProps> = ({ productId }: YouMightLikeProps) => {
  const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')
  const breakpoint = useBreakpoint()

  const { loading, error, data } = useQuery<CollectionQuery>(GET_PRODUCTS, {
    variables: {
      collectionId: shopifyCoffeeCollection,
      first: 10,
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
      first: 10,
      last: null,
      before: null,
      after: null,
      sortKey: undefined,
      reverse: undefined,
    },
  })

  const resultsCoffee = [...(data?.collection?.products?.nodes || [])].slice(0, breakpoint === 'lg' ? 3 : 2)
  const resultsAccessories = [...(data2?.collection?.products?.nodes || [])]
    .filter((node) => getSimplifiedId(node.id) !== productId)
    .slice(0, breakpoint === 'lg' ? 3 : 2)
  const productNodes = resultsCoffee.concat(resultsAccessories)

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
