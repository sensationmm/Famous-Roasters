import { useQuery } from '@apollo/client'
import { Collection } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorPrompt, Layout, Loader, ProductTile } from 'src/components'

export const Catalogue: React.FC = () => {
  const { t } = useTranslation()
  const query = loader('src/graphql/queries/products.query.graphql')

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.catalogue.title')}`
  }, [])

  const { loading, error, data } = useQuery<Collection>(query)
  const edges = data?.products.edges
  const productNodes = edges?.map((edge) => edge.node)

  const renderProducts = () => {
    if (loading) {
      return <Loader />
    } else {
      if (error) {
        return <ErrorPrompt promptAction={() => history.go(0)} />
      } else {
        return (
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {productNodes?.map((node, i: number) => (
              <ProductTile key={`title-${i}`} productNode={node} />
            ))}
          </div>
        )
      }
    }
  }

  return (
    <Layout>
      <main className="flex flex-grow w-full items-start justify-center bg-white mt-4">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">{renderProducts()}</div>
      </main>
    </Layout>
  )
}
