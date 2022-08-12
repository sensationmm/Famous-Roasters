import { ApolloError } from '@apollo/client'
import { useLazyQuery } from '@apollo/client/react/hooks'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { Collection, Maybe, ProductConnection, Scalars } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import {
  Checkbox,
  ErrorPrompt,
  FilterData,
  FiltersMenuMobile,
  Layout,
  Listbox,
  ListBoxItem,
  Loader,
  ProductTile,
  TabsNavigation,
  TagSwatch,
  TagType,
  Typography,
  TypographySize,
} from 'src/components'
import { Pagination } from 'src/components/Pagination'
import { famousRoastersClient as frClient, shopifyAccessoryCollection, shopifyCoffeeCollection } from 'src/config'
import { getSimplifiedProductId } from 'src/utils/formatters'

import { ProductCustom } from '../Product'
import { getFilterData, getQueryFilter, sortParamsToListBoxItem } from '.'

interface ProductConnectionCustom extends ProductConnection {
  nodes: Array<ProductCustom>
}

interface CollectionCustom extends Collection {
  products: ProductConnectionCustom
}

interface CollectionQuery {
  collection: CollectionCustom
}

interface TabsDataItem {
  key: string
  translationKey: string
}

interface SortParams {
  sortKey?: string
  reverse?: boolean
}

interface PaginationParams {
  first: Maybe<Scalars['Int']>
  last: Maybe<Scalars['Int']>
  before: Maybe<Scalars['String']>
  after: Maybe<Scalars['String']>
}

interface QueryFilterParams {
  queryFilter: object[] | undefined
}

interface QueryProductsVariables {
  collectionId?: string
  first: Maybe<number>
  last: Maybe<number>
  before: Maybe<string>
  after: Maybe<string>
  sortKey: string | undefined
  reverse: true | undefined
  filters: object[] | undefined
}

const tabsData: TabsDataItem[] = [
  // disabled for now
  // { key: 'forYou', translationKey: 'pages.catalogue.tabs.forYou' },
  { key: 'discover', translationKey: 'pages.catalogue.tabs.discover' },
  // TODO: restore when accessories go live
  // { key: 'coffee', translationKey: 'pages.catalogue.tabs.coffee' },
  // { key: 'accessories', translationKey: 'pages.catalogue.tabs.accessories' },
]

const sortByItems: ListBoxItem[] = [{ name: 'priceAsc' }, { name: 'priceDesc' }, { name: 'newDesc' }]

const totalItemsPerPage = 6

const paginationParamsInitialValue = {
  first: totalItemsPerPage,
  last: null,
  before: null,
  after: null,
}

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
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  // TODO: remove bypass when accessories go live
  const [activeTab, setActiveTab] = useState<string>(searchParams.get('isAccessory') ? 'accessories' : 'discover')
  const [sortValue, setSortValue] = useState<ListBoxItem[]>()
  const [sortParams, setSortParams] = useState<SortParams>()
  const [filters, setFilters] = useState<FilterData[]>([])
  const [filterAttributesData, setFilterAttributesData] = useState<FilterResponse>()
  const [queryFilterParams, setQueryFilterParams] = useState<QueryFilterParams>()
  const [paginationParams, setPaginationParams] = useState<PaginationParams>(paginationParamsInitialValue)
  const [queryProductsVariables, setQueryProductsVariables] = useState<QueryProductsVariables>()
  const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')
  const GET_FILTER_ATTRIBUTES = loader('src/graphql/queries/filterAttributes.query.graphql')

  const famousRoastersClient = frClient()

  let filterAttributesLoading: boolean, filterAttributesError: ApolloError | undefined

  const filtersData = (filterInput: FilterResponse): FilterData[] => {
    const coffeeType = searchParams.get('coffeeType')?.split('|')
    const decaf = searchParams.get('decaf')?.split('|')
    const beanType = searchParams.get('beanType')?.split('|')
    const vendor = searchParams.get('vendor')?.split('|')
    const origin = searchParams.get('origin')?.split('|')
    const packageSize = searchParams.get('packageSize')?.split('|')
    const aroma = searchParams.get('aroma')?.split('|')
    return getFilterData(filterInput, coffeeType, decaf, beanType, vendor, origin, packageSize, aroma)
  }

  const processFilterValues = (fData: FilterResponse, f: FilterData[]) => {
    setFilters(f)
    const { queryFilter, vendor, coffeeType, decaf, beanType, origin, packageSize, aroma } = getQueryFilter(fData, f)
    queryFilter.length > 0 ? setQueryFilterParams({ queryFilter }) : setQueryFilterParams({ queryFilter: undefined })

    const updatedSearchParams = {
      ...Object.fromEntries(searchParams),
      ...(vendor.length > 0 && { vendor: vendor.join('|') }),
      ...(coffeeType.length > 0 && { coffeeType: coffeeType.join('|') }),
      ...(decaf.length > 0 && { decaf: decaf.join('|') }),
      ...(beanType.length > 0 && { beanType: beanType.join('|') }),
      ...(origin.length > 0 && { origin: origin.join('|') }),
      ...(packageSize.length > 0 && { packageSize: packageSize.join('|') }),
      ...(aroma.length > 0 && { aroma: aroma.join('|') }),
    }
    if (!vendor.length) delete updatedSearchParams.vendor
    if (!coffeeType.length) delete updatedSearchParams.coffeeType
    if (!decaf.length) delete updatedSearchParams.decaf
    if (!beanType.length) delete updatedSearchParams.beanType
    if (!origin.length) delete updatedSearchParams.origin
    if (!packageSize.length) delete updatedSearchParams.packageSize
    if (!aroma.length) delete updatedSearchParams.aroma

    const currentSearchParams = Object.fromEntries(searchParams)
    if (JSON.stringify(updatedSearchParams) !== JSON.stringify(currentSearchParams)) {
      setSearchParams(updatedSearchParams)
    }
  }

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.catalogue.title')}`
    const sortKeyParam = searchParams.get('sortKey')
    const reverseParam = searchParams.get('reverse')
    const updatedSortParams = {
      ...(sortKeyParam ? { sortKey: sortKeyParam } : { sortKey: 'BEST_SELLING' }),
      ...(reverseParam && reverseParam == '1' ? { reverse: true } : { reverse: false }),
    }
    setSortParams(updatedSortParams)
    setSortValue(sortParamsToListBoxItem(updatedSortParams))

    famousRoastersClient
      .query({
        query: GET_FILTER_ATTRIBUTES,
      })
      .then((res) => {
        const { loading, error, data } = res
        filterAttributesLoading = loading
        filterAttributesError = error
        setFilterAttributesData(data.filterDictionaries)
        data.filterDictionaries && processFilterValues(data.filterDictionaries, filtersData(data.filterDictionaries))
      })
      .catch((err) => {
        filterAttributesError = error
        throw new Error('Error fetching filter attributes', err)
      })
  }, [])

  useEffect(() => {
    if (sortValue && sortValue[0]?.name) {
      const currentSearchParams = Object.fromEntries(searchParams)
      let updatedSearchParams: URLSearchParamsInit
      switch (sortValue[0].name) {
        case 'priceAsc': {
          setSortParams({ sortKey: 'PRICE', reverse: false })
          updatedSearchParams = {
            ...Object.fromEntries([...searchParams]),
            sortKey: 'PRICE',
          }
          delete updatedSearchParams.reverse
          break
        }
        case 'priceDesc': {
          setSortParams({ sortKey: 'PRICE', reverse: true })
          updatedSearchParams = {
            ...Object.fromEntries([...searchParams]),
            sortKey: 'PRICE',
            reverse: '1',
          }
          break
        }
        case 'newDesc': {
          setSortParams({ sortKey: 'CREATED', reverse: false })
          updatedSearchParams = {
            ...Object.fromEntries([...searchParams]),
            sortKey: 'CREATED',
          }
          delete updatedSearchParams.reverse
          break
        }
        default: {
          setSortParams({ sortKey: 'BEST_SELLING', reverse: false })
          updatedSearchParams = { ...Object.fromEntries([...searchParams]) }
          delete updatedSearchParams.sortKey
          delete updatedSearchParams.reverse
          break
        }
      }
      if (JSON.stringify(updatedSearchParams) !== JSON.stringify(currentSearchParams)) {
        setSearchParams(updatedSearchParams)
      }
    }
  }, [sortValue])

  useEffect(() => {
    setPaginationParams(paginationParamsInitialValue)
  }, [queryFilterParams, sortParams])

  const [getProducts, { error, data }] = useLazyQuery<CollectionQuery>(GET_PRODUCTS)

  const fetchProducts = useCallback(
    (queryVars: QueryProductsVariables) => {
      getProducts({
        variables: queryVars,
      }).catch((err) => {
        throw new Error('Error fetching catalogue', err)
      })
    },
    [queryProductsVariables],
  )

  useEffect(() => {
    if (queryFilterParams !== undefined) {
      const sortKey = searchParams.get('sortKey')
      const reverseParam = searchParams.get('reverse')
      const queryVars: QueryProductsVariables = {
        collectionId: activeTab === 'accessories' ? shopifyAccessoryCollection : shopifyCoffeeCollection,
        first: paginationParams?.first,
        last: paginationParams?.last,
        before: paginationParams?.before,
        after: paginationParams?.after,
        sortKey: sortKey ? sortKey : undefined,
        reverse: reverseParam && reverseParam == '1' ? true : undefined,
        filters: queryFilterParams?.queryFilter,
      }
      setQueryProductsVariables(queryVars)
      if (queryProductsVariables != queryVars) {
        fetchProducts(queryVars)
      }
    }
  }, [searchParams, queryFilterParams, paginationParams, activeTab])

  if (filterAttributesError) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  const productNodes = data?.collection?.products.nodes
  const pageInfo = data?.collection?.products.pageInfo || {
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

  const onUpdateFiltersMobile = (f: FilterData[]) => {
    const allFilters = [filters.filter((fil) => fil.key === 'coffeeType')[0], ...f]
    filterAttributesData && processFilterValues(filterAttributesData, allFilters)
  }

  const onUpdateFiltersDesktop = (items: ListBoxItem[] | undefined, key: string) => {
    const updatedFilters = (): FilterData[] => {
      const rest = filters.filter((filter) => filter.key !== key)
      const original =
        filterAttributesData && filtersData(filterAttributesData).filter((filter) => filter.key === key)[0]
      const actual: FilterData = {
        ...original,
        key: original?.key || '',
        isOpen: original?.isOpen || false,
        filterValuesSelected: items?.map((x: { name: string }) => x.name).filter((fv) => fv != 'none') || [],
      }
      return [...rest, actual]
    }
    filterAttributesData && processFilterValues(filterAttributesData, updatedFilters())
  }

  const onUpdateFilterCheckbox = (value: boolean, key: string) => {
    const valueAsString = value.toString()
    const items = valueAsString === 'true' ? [{ name: 'true' }] : []
    onUpdateFiltersDesktop(items, key)
  }

  const renderListboxFilter = (key: string, hasTranslatedValues: boolean, hasSpacerAfterItem?: string[]) => {
    const filtersToShow = filters.filter((filter) => filter.key === key)[0]
    return (
      <Listbox
        items={
          filtersToShow?.filterValues
            ?.map((x) => ({
              name: hasTranslatedValues ? t(`pages.catalogue.filters.${key}.values.${x}`) : x,
            }))
            .sort((a, b) => (key !== 'packageSize' ? (a.name > b.name ? 1 : -1) : 1)) || []
        }
        hasTranslatedValues={false}
        translationPrefix={`pages.catalogue.filters.${key}`}
        value={filtersToShow.filterValuesSelected?.map((fv) => ({ name: fv }))}
        multiple={key !== 'coffeeType'}
        hasNoneItem={key === 'coffeeType' || key === 'accessoryType'}
        resetOnNoneClick={key === 'coffeeType' || key === 'accessoryType'}
        onChange={(v) => onUpdateFiltersDesktop(v, key)}
        big={key === 'coffeeType' || key === 'accessoryType'}
        hasSpacerAfterItem={hasSpacerAfterItem}
        swatches={
          key === 'aroma'
            ? filtersToShow?.filterValues?.map((x, count) => (
                <TagSwatch
                  key={`filter-swatch-${count}`}
                  data-testid="filter-option-tagSwatch"
                  type={TagType.Aroma}
                  value={x}
                />
              ))
            : undefined
        }
      />
    )
  }

  const renderCheckboxFilter = (key: string) => {
    const v = filters.filter((filter) => filter.key === key)[0]
    return (
      <Checkbox
        name={key}
        text={t(`pages.catalogue.filters.${key}`)}
        selected={v && v.filterValuesSelected && v.filterValuesSelected[0] === 'true' ? true : false}
        toggleSelected={(value) => onUpdateFilterCheckbox(value, key)}
      />
    )
  }

  const renderDiscoverProducts = () => {
    return (
      <>
        <div className="mt-4">{renderListboxFilter('coffeeType', false)}</div>
        <div className="my-4 md:w-1/4">{renderCheckboxFilter('decaf')}</div>
        <div className="hidden md:flex gap-x-4">
          <div className="md:w-1/4">{renderListboxFilter('aroma', false)}</div>
          <div className="md:w-1/4">{renderListboxFilter('beanType', false)}</div>
          <div className="md:w-1/4">{renderListboxFilter('origin', true)}</div>
          <div className="md:w-1/4">{renderListboxFilter('vendor', false)}</div>
          <div className="md:w-1/4">{renderListboxFilter('packageSize', false)}</div>
        </div>
        <div className="flex gap-x-4 justify-end">
          <div className="w-1/2 md:hidden">
            {!filterAttributesData || filterAttributesLoading ? (
              <div
                className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
                data-testid="button-filters-menu-open-loading"
              >
                <Typography size={TypographySize.Base} className="block truncate">
                  {t(`pages.catalogue.filters.common.filtersMenu.filter`)}
                </Typography>
                <ChevronRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </div>
            ) : (
              <FiltersMenuMobile
                initialFilters={filters.filter((f) => f.key !== 'coffeeType' && f.key !== 'decaf')}
                onUpdateFilters={(f: FilterData[]) => onUpdateFiltersMobile(f)}
                hasSpacerAfterItem={[{ filterKey: 'beanType', filterValue: 'Arabica, Robusta' }]}
              />
            )}
          </div>
          {['1', '2', '3'].map((fillBlock) => (
            <div key={`fill-block-${fillBlock}`} className="hidden md:block md:w-1/4" />
          ))}
          <div className="w-1/2 md:w-1/4 md:mt-4">
            <Listbox
              items={sortByItems}
              hasNoneItem={true}
              translationPrefix="pages.catalogue.filters.sort"
              value={sortValue ? [sortValue[0]] : undefined}
              onChange={setSortValue}
            />
          </div>
        </div>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {productNodes?.map((node, i: number) => {
            const id = getSimplifiedProductId(node.id)
            return (
              <Link to={`/product/${id}`} key={`product-tile-link-${i}`}>
                <ProductTile key={`title-${i}`} showFrom={true} productNode={node} />
              </Link>
            )
          })}
        </div>
        <div className="mb-8 mt-8">
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

  const renderAccessories = () => {
    return (
      <>
        <div className="mt-4">{renderListboxFilter('accessoryType', false)}</div>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {productNodes?.map((node, i: number) => {
            const id = getSimplifiedProductId(node.id)
            return (
              <Link to={`/product/${id}`} key={`product-tile-link-${i}`}>
                <ProductTile key={`title-${i}`} showFrom={true} productNode={node} showType="category" />
              </Link>
            )
          })}
        </div>
        <div className="mb-8 mt-8">
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

  const renderContent = () => {
    // console.log('error', error)
    if (error !== undefined || !pageInfo) {
      return <ErrorPrompt promptAction={() => history.go(0)} />
    }

    if (!data || !filterAttributesData || !filters.length || queryFilterParams === undefined) {
      return (
        <div className="flex h-64 mb-32 justify-center items-center">
          <Loader />
        </div>
      )
    }

    return activeTab === 'discover' ? renderDiscoverProducts() : renderAccessories()
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
          {renderContent()}
        </div>
      </main>
    </Layout>
  )
}
