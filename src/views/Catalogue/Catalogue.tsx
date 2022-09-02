import { Collection, ProductConnection } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import algoliasearch from 'algoliasearch'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { useParams } from 'react-router-dom'
import { Layout, TabsNavigation } from 'src/components'
import AccessoriesSearch from 'src/components/AlgoliaSearch/AccessoriesSearch'
import CoffeeSearch from 'src/components/AlgoliaSearch/CoffeeSearch'

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

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID || '',
  process.env.REACT_APP_ALGOLIA_API_KEY || '',
)
const tabsData: TabsDataItem[] = [
  // disabled for now
  // { key: 'forYou', translationKey: 'pages.catalogue.tabs.forYou' },
  // { key: 'discover', translationKey: 'pages.catalogue.tabs.discover' },
  { key: 'coffee', translationKey: 'pages.catalogue.tabs.coffee' },
  { key: 'accessories', translationKey: 'pages.catalogue.tabs.accessories' },
]

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

  return (
    <Layout>
      <main className="flex flex-grow w-full items-start justify-center bg-white mt-4">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
          <TabsNavigation tabsData={tabsData} />
          <InstantSearch indexName="products" searchClient={searchClient} routing={true}>
            {productType === 'accessories' ? <AccessoriesSearch /> : <CoffeeSearch />}
          </InstantSearch>
        </div>
      </main>
    </Layout>
  )
}
