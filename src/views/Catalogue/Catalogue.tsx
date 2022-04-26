import { useQuery } from '@apollo/client'
import { Collection, Maybe, Product, Scalars } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ErrorPrompt,
  FilterData,
  FiltersMenuMobile,
  Layout,
  Listbox,
  ListBoxItem,
  Loader,
  ProductTile,
  TabsNavigation,
  Typography,
} from 'src/components'
import { Pagination } from 'src/components/Pagination'

interface CustomProduct extends Product {
  pricePerKg?: {
    value: string
  }
}

interface TabsDataItem {
  key: string
  translationKey: string
}

interface SortParams {
  sortKey: string
  reverse: boolean
}

interface PaginationParams {
  first: Maybe<Scalars['Int']>
  last: Maybe<Scalars['Int']>
  before: Maybe<Scalars['String']>
  after: Maybe<Scalars['String']>
}

interface FilterParams {
  query: string | undefined
}

const tabsData: TabsDataItem[] = [
  { key: 'forYou', translationKey: 'pages.catalogue.tabs.forYou' },
  { key: 'discover', translationKey: 'pages.catalogue.tabs.discover' },
]

const sortByItems: ListBoxItem[] = [{ name: 'priceAsc' }, { name: 'priceDesc' }, { name: 'newDesc' }]

const totalItemsPerPage = 6

export const Catalogue: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('discover')
  const [sortValue, setSortValue] = useState<ListBoxItem>()
  const [sortParams, setSortParams] = useState<SortParams>()
  const [filters, setFilters] = useState<FilterData[]>([])
  const [filterParams, setFilterParams] = useState<FilterParams>()
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    first: totalItemsPerPage,
    last: null,
    before: null,
    after: null,
  })
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

  useEffect(() => {
    let query = ''
    filters.map((filter) => {
      if (filter.filterValuesSelected) {
        switch (filter.key) {
          case 'vendor':
            query += filter.filterValuesSelected
              .map((filterValue, idx) => (idx === 0 ? `vendor:${filterValue}` : ` OR vendor:${filterValue}`))
              .join('')
            break
        }
      }
    })
    query.length > 0 ? setFilterParams({ query }) : setFilterParams({ query: undefined })
  }, [filters])

  // console.log("filterParams", filterParams)

  const { loading, error, data } = useQuery<Collection>(GET_PRODUCTS, {
    variables: {
      first: paginationParams?.first,
      last: paginationParams?.last,
      before: paginationParams?.before,
      after: paginationParams?.after,
      sortKey: sortParams?.sortKey,
      reverse: sortParams?.reverse,
      query: filterParams?.query,
    },
  })

  const productNodes = data?.products.nodes
  const pageInfo = data?.products.pageInfo || {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  }

  const handleNextClicked = () => {
    setPaginationParams({
      first: totalItemsPerPage,
      last: null,
      before: null,
      after: pageInfo.endCursor || null,
    })
  }

  const handlePreviousClicked = () => {
    setPaginationParams({
      first: null,
      last: totalItemsPerPage,
      before: pageInfo.startCursor || null,
      after: null,
    })
  }

  const onUpdateFilters = (f: FilterData[]) => {
    setFilters(f)
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
      return (
        <div className="flex h-64 mb-32 justify-center items-center">
          <Loader />
        </div>
      )
    } else {
      if (error || !pageInfo) {
        return <ErrorPrompt promptAction={() => history.go(0)} />
      } else {
        return (
          <>
            <div className="flex gap-x-4 justify-end mt-8">
              <div className="w-1/2 md:hidden">
                <FiltersMenuMobile initialFilters={filters} onUpdateFilters={(f: FilterData[]) => onUpdateFilters(f)} />
              </div>
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
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {productNodes?.map((node: CustomProduct, i: number) => (
                <ProductTile key={`title-${i}`} productNode={node} />
              ))}
            </div>
            <div className="mb-8">
              <Pagination
                hasNextPage={pageInfo?.hasNextPage || false}
                hasPreviousPage={pageInfo?.hasPreviousPage || false}
                next={handleNextClicked}
                previous={handlePreviousClicked}
              />
            </div>
          </>
        )
      }
    }
  }

  return (
    <Layout>
      <main className="flex flex-grow w-full items-start justify-center bg-white mt-4">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
          <TabsNavigation
            tabsData={tabsData}
            initialActiveTabKey="discover"
            setParentActiveTab={(k: string) => setActiveTab(k)}
          />
          {activeTab === 'discover' ? renderDiscoverProducts() : renderForYouProducts()}
        </div>
      </main>
    </Layout>
  )
}
