import { useQuery } from '@apollo/client'
import { Collection } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ErrorPrompt,
  Layout,
  Listbox,
  ListBoxItem,
  Loader,
  ProductTile,
  TabsNavigation,
  Typography,
} from 'src/components'

interface TabsDataItem {
  key: string
  translationKey: string
}

interface SortParams {
  sortKey: string
  reverse: boolean
}

const tabsData: TabsDataItem[] = [
  { key: 'forYou', translationKey: 'pages.catalogue.tabs.forYou' },
  { key: 'discover', translationKey: 'pages.catalogue.tabs.discover' },
]

const sortByItems: ListBoxItem[] = [{ name: 'priceAsc' }, { name: 'priceDesc' }, { name: 'newDesc' }]

export const Catalogue: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('discover')
  const [sortValue, setSortValue] = useState<ListBoxItem>()
  const [sortParams, setSortParams] = useState<SortParams>()
  const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.catalogue.title')}`
  }, [])

  useEffect(() => {
    if (sortValue?.name) {
      switch (sortValue.name) {
        case 'priceAsc':
          setSortParams({ sortKey: 'PRICE', reverse: false })
          break
        case 'priceDesc':
          setSortParams({ sortKey: 'PRICE', reverse: true })
          break
        case 'newDesc':
          setSortParams({ sortKey: 'CREATED_AT', reverse: false })
          break
        default:
          setSortParams({ sortKey: 'BEST_SELLING', reverse: false })
          break
      }
    }
  }, [sortValue])

  const { loading, error, data } = useQuery<Collection>(GET_PRODUCTS, {
    variables: {
      first: 20,
      sortKey: sortParams?.sortKey,
      reverse: sortParams?.reverse,
    },
  })

  const edges = data?.products.edges
  const productNodes = edges?.map((edge) => edge.node)

  const renderForYouProducts = () => {
    return (
      <div className="flex justify-center my-20">
        <Typography>{t('error.unavailable.text')}</Typography>
      </div>
    )
  }

  const renderDiscoverProducts = () => {
    if (loading) {
      return (
        <div className="flex h-64 mb-32 justify-center items-center">
          <Loader />
        </div>
      )
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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <TabsNavigation
            tabsData={tabsData}
            initialActiveTabKey="discover"
            setParentActiveTab={(k: string) => setActiveTab(k)}
          />
          <div className="flex justify-end mt-8">
            <div className="w-1/2 md:w-1/3 xl:w-1/5">
              <Listbox
                items={sortByItems}
                hasNoneItem={true}
                translationPrefix="pages.catalogue.filters.sort"
                value={sortValue}
                onChange={setSortValue}
              />
            </div>
          </div>
          {activeTab === 'discover' ? renderDiscoverProducts() : renderForYouProducts()}
        </div>
      </main>
    </Layout>
  )
}
