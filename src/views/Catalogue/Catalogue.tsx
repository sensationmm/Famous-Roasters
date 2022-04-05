import { useQuery } from '@apollo/client'
import { Collection } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorPrompt, Layout, Loader, ProductTile, Typography, TypographySize } from 'src/components'

enum TabItemKey {
  ForYou = 'forYou',
  Discover = 'discover',
}

interface TabsDataItem {
  key: TabItemKey
}

const tabsData: TabsDataItem[] = [{ key: TabItemKey.ForYou }, { key: TabItemKey.Discover }]

export const Catalogue: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabItemKey>(TabItemKey.Discover)
  const query = loader('src/graphql/queries/products.query.graphql')

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.catalogue.title')}`
  }, [])

  const { loading, error, data } = useQuery<Collection>(query)
  const edges = data?.products.edges
  const productNodes = edges?.map((edge) => edge.node)

  const renderTabs = () => {
    return (
      <div className="flex" role="tablist">
        {tabsData.map((tabsDataItem: TabsDataItem) => {
          const isActive = tabsDataItem.key === activeTab
          return (
            <button
              type="button"
              onClick={() => setActiveTab(tabsDataItem.key)}
              key={tabsDataItem.key}
              data-testid={`tab-${tabsDataItem.key}`}
              className="mr-6"
              role="tab"
              aria-selected={isActive}
            >
              <Typography
                size={TypographySize.Small}
                className={
                  isActive ? 'text-brand-black font-semibold border-b-2 pb-1.5' : 'text-coreUI-text-secondary pb-1.5'
                }
              >
                {t(`pages.catalogue.tabs.${tabsDataItem.key}`)}
              </Typography>
            </button>
          )
        })}
      </div>
    )
  }

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
          {renderTabs()}
          {activeTab === TabItemKey.Discover ? renderDiscoverProducts() : renderForYouProducts()}
        </div>
      </main>
    </Layout>
  )
}
