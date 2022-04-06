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

const tabsData: TabsDataItem[] = [
  { key: 'forYou', translationKey: 'pages.catalogue.tabs.forYou' },
  { key: 'discover', translationKey: 'pages.catalogue.tabs.discover' },
]

const sortByItems: ListBoxItem[] = [
  { name: 'Price increasing' },
  { name: 'Price decreasing' },
  { name: 'Newest first' },
  { name: 'None' },
]

export const Catalogue: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('discover')
  const query = loader('src/graphql/queries/products.query.graphql')

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.catalogue.title')}`
  }, [])

  const { loading, error, data } = useQuery<Collection>(query)
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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <TabsNavigation
            tabsData={tabsData}
            initialActiveTabKey="discover"
            setParentActiveTab={(k: string) => setActiveTab(k)}
          />
          <div className="flex justify-end mt-8">
            <Listbox items={sortByItems} label="Sort by..." />
          </div>
          {activeTab === 'discover' ? renderDiscoverProducts() : renderForYouProducts()}
        </div>
      </main>
    </Layout>
  )
}
