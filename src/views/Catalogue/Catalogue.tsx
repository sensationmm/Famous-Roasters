import { useQuery } from '@apollo/client/react/hooks'
import { Collection, ProductConnection } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import algoliasearch from 'algoliasearch'
import { loader } from 'graphql.macro'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { useParams } from 'react-router-dom'
import { ErrorPrompt, Layout, Loader, ProductTileLoader, TabsNavigation } from 'src/components'
import AccessoriesSearch from 'src/components/AlgoliaSearch/AccessoriesSearch'
import CoffeeSearch from 'src/components/AlgoliaSearch/CoffeeSearch'
import { normalizeString } from 'src/utils'

import { ProductCustom } from '../Product'

interface ProductConnectionCustom extends ProductConnection {
  nodes: Array<ProductCustom>
}

interface CollectionCustom extends Collection {
  products: ProductConnectionCustom
}

export interface CollectionQuery {
  collection: CollectionCustom
}

interface TabsDataItem {
  key: string
  translationKey: string
}

interface ShopifyCollection {
  title: string
  sortOrder: {
    value: number
  }
  products: {
    nodes: Array<{
      id: string
    }>
  }
}

type ShopifyPage = {
  body: string
  handle: string
}

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID || '',
  process.env.REACT_APP_ALGOLIA_API_KEY || '',
)

export type FilterResponse = {
  aromas: Array<string>
  beanTypes: Array<string>
  coffeeTypes: Array<string>
  accessoryTypes: Array<string>
  origins: Array<string>
  packageSizes: Array<string>
  vendors: Array<string>
}

export const Catalogue: React.FC = () => {
  const { productType } = useParams()
  const { t } = useTranslation()
  const COLLECTIONS = loader('src/graphql/queries/collections.query.graphql')
  const PAGES = loader('src/graphql/queries/pages.query.graphql')

  const { loading, error, data } = useQuery(COLLECTIONS)
  const { data: dataPages } = useQuery(PAGES)

  if (error) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  if (loading) {
    return (
      <Layout>
        <main className="flex flex-grow w-full items-start justify-center bg-white mt-4">
          <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
            <div className="h-[290px] xl:h-[226px] flex justify-center items-center">
              <Loader />
            </div>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-16 pb-8 border-b border-coreUI-border ">
              {[...Array(12)].map((_, count) => (
                <ProductTileLoader key={`loader-${count}`} />
              ))}
            </div>
          </div>
        </main>
      </Layout>
    )
  }

  const tabsData: TabsDataItem[] = data.collections.nodes
    .filter((tab: ShopifyCollection) => tab.sortOrder !== null && tab.products.nodes.length > 0)
    .sort((a: ShopifyCollection, b: ShopifyCollection) => (a.sortOrder.value > b.sortOrder.value ? 1 : -1))
    .map((tab: ShopifyCollection) => {
      let tabKey = tab.title.toLowerCase()
      if (tabKey === 'equipment') tabKey = 'accessories'
      return { key: tabKey, translationKey: `pages.catalogue.tabs.${tabKey}` }
    })

  const getPath = () => {
    const pathParts = ['catalogue']
    if (productType && productType !== 'coffee') {
      pathParts.push(productType)
    }
    return pathParts.join('/')
  }

  const getDescription = (filter?: string) => {
    const collectionLabel = productType ? productType : 'coffee'
    if (filter !== undefined) {
      const pageData = dataPages?.pages
        ? dataPages?.pages?.nodes?.filter(
            (page: ShopifyPage) => page.handle === `${collectionLabel}-${normalizeString(filter)}`,
          )
        : []
      return pageData.length > 0 ? pageData[0].body : ''
    } else {
      const collectionData = data?.collections
        ? data?.collections?.nodes?.filter(
            (collection: ShopifyCollection) => collection.title.toLowerCase() === collectionLabel,
          )
        : []

      return collectionData.length > 0 ? collectionData[0]?.descriptionHtml : ''
    }
  }

  return (
    <Layout>
      <Helmet>
        <title>{`${t('brand.seo.catalogue')} | ${t('brand.name')}`}</title>
        <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_SHOP}/${getPath()}`} />
      </Helmet>
      <main className="flex flex-grow w-full items-start justify-center bg-white mt-4">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
          {data && <TabsNavigation tabsData={tabsData} />}
          <InstantSearch indexName="products" searchClient={searchClient} routing={true}>
            {!productType || productType === 'coffee' ? (
              <CoffeeSearch getDescription={getDescription} />
            ) : (
              <AccessoriesSearch getDescription={getDescription} />
            )}
          </InstantSearch>
        </div>
      </main>
    </Layout>
  )
}
