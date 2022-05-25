import { useQuery } from '@apollo/client/react/hooks'
import { ChevronRightIcon } from '@heroicons/react/solid'
import {
  Collection,
  Maybe,
  Product as ProductType,
  ProductConnection,
  Scalars,
} from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
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
  TypographySize,
} from 'src/components'
import { Pagination } from 'src/components/Pagination'
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

interface QueryFilterParams {
  queryFilter: object[] | undefined
}

const tabsData: TabsDataItem[] = [
  { key: 'forYou', translationKey: 'pages.catalogue.tabs.forYou' },
  { key: 'discover', translationKey: 'pages.catalogue.tabs.discover' },
]

const sortByItems: ListBoxItem[] = [{ name: 'priceAsc' }, { name: 'priceDesc' }, { name: 'newDesc' }]

const totalItemsPerPage = 6

const paginationParamsInitialValue = {
  first: totalItemsPerPage,
  last: null,
  before: null,
  after: null,
}

export const Catalogue: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('discover')
  const [sortValue, setSortValue] = useState<ListBoxItem[]>()
  const [sortParams, setSortParams] = useState<SortParams>()
  const [filters, setFilters] = useState<FilterData[]>([])
  const [queryFilterParams, setQueryFilterParams] = useState<QueryFilterParams>()
  const [paginationParams, setPaginationParams] = useState<PaginationParams>(paginationParamsInitialValue)
  const [originMetaValues, setOriginMetaValues] = useState<string[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const GET_PRODUCTS = loader('src/graphql/queries/products.query.graphql')
  const GET_FILTER_ATTRIBUTES = loader('src/graphql/queries/filterAttributes.query.graphql')

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.catalogue.title')}`
    const params = Object.fromEntries([...searchParams])
    console.log('params', params)
  }, [])

  const {
    loading: filterAttributesLoading,
    error: filterAttributesError,
    data: filterAttributesData,
  } = useQuery<Collection>(GET_FILTER_ATTRIBUTES)

  const getFilterValues = (key: string) => {
    switch (key) {
      case 'vendor':
        return Array.from(
          new Set(
            filterAttributesData?.products.nodes
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              .map((productNode) => productNode.vendor)
              .flat()
              .filter((x) => x !== undefined)
              .sort(),
          ),
        )
      case 'origin': {
        const originMapping = Array.from(
          new Set(
            filterAttributesData?.products.nodes
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              .map((productNode) => productNode['origin']?.value.replace(', ', ','))
              .flat()
              .filter((x) => x !== undefined)
              .sort(),
          ),
        )
        setOriginMetaValues(originMapping)
        return Array.from(new Set(originMapping.map((value) => value.split(',')).flat())).sort()
      }
      case 'bean_type':
        return Array.from(
          new Set(
            filterAttributesData?.products.nodes
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              .map((productNode) => productNode['bean_type']?.value)
              .flat()
              .filter((x) => x !== undefined)
              .sort(),
          ),
        )
      case 'package_size':
        return Array.from(
          new Set(
            filterAttributesData?.products.nodes
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              .map((productNode) => productNode.variants.nodes.map((variantNode) => variantNode['package_size'].value))
              .flat()
              .sort((a, b) => (parseFloat(a) > parseFloat(b) ? 1 : -1)),
          ),
        )
    }
  }

  const filtersData = (): FilterData[] => [
    { key: 'beanType', isOpen: false, filterType: 'enum', filterValues: getFilterValues('bean_type') },
    { key: 'vendor', isOpen: false, filterType: 'enum', filterValues: getFilterValues('vendor') },
    { key: 'origin', isOpen: false, filterType: 'enum', filterValues: getFilterValues('origin'), i18nValues: true },
    { key: 'packageSize', isOpen: false, filterType: 'enum', filterValues: getFilterValues('package_size') },
  ]

  useEffect(() => {
    setFilters(filtersData())
  }, [!filterAttributesLoading])

  if (filterAttributesError) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  useEffect(() => {
    if (sortValue && sortValue[0]?.name) {
      switch (sortValue[0].name) {
        case 'priceAsc':
          setSortParams({ sortKey: 'PRICE', reverse: false })
          break
        case 'priceDesc':
          setSortParams({ sortKey: 'PRICE', reverse: true })
          break
        case 'newDesc':
          setSortParams({ sortKey: 'CREATED', reverse: false })
          break
        default:
          setSortParams({ sortKey: 'BEST_SELLING', reverse: false })
          break
      }
    }
  }, [sortValue])

  useEffect(() => {
    const queryFilter: object[] = []
    const vendor: string[] = []
    const beanType: string[] = []
    const origin: string[] = []
    const packageSize: string[] = []
    filters.map((filter) => {
      if (filter.filterValuesSelected) {
        switch (filter.key) {
          case 'vendor':
            filter.filterValuesSelected.map((filterValue) => {
              vendor.push(filterValue)
              queryFilter.push({ productVendor: `${filterValue}` })
            })
            break
          case 'beanType':
            filter.filterValuesSelected.map((filterValue) => {
              beanType.push(filterValue)
              queryFilter.push({
                productMetafield: { namespace: 'my_fields', key: 'bean_type', value: `${filterValue}` },
              })
            })
            break
          case 'origin':
            filter.filterValuesSelected.map((filterValue) => {
              originMetaValues
                .filter((origin) => origin.indexOf(filterValue) !== -1)
                .map((fv) => {
                  origin.push(fv)
                  queryFilter.push({
                    productMetafield: { namespace: 'my_fields', key: 'origin', value: `${fv}` },
                  })
                })
            })
            break
          case 'packageSize':
            filter.filterValuesSelected.map((filterValue) => {
              packageSize.push(filterValue)
              queryFilter.push({
                variantMetafield: { namespace: 'my_fields', key: 'package_size', value: `${filterValue}` },
              })
            })
            break
        }
      }
    })
    queryFilter.length > 0 ? setQueryFilterParams({ queryFilter }) : setQueryFilterParams({ queryFilter: undefined })
    const searchParams = {
      ...(vendor.length > 0 && { vendor }),
      ...(beanType.length > 0 && { beanType }),
      ...(origin.length > 0 && { origin }),
      ...(packageSize.length > 0 && { packageSize }),
    }
    setSearchParams(searchParams)
  }, [filters])

  useEffect(() => {
    setPaginationParams(paginationParamsInitialValue)
  }, [queryFilterParams, sortParams])

  const { loading, error, data } = useQuery<CollectionQuery>(GET_PRODUCTS, {
    variables: {
      first: paginationParams?.first,
      last: paginationParams?.last,
      before: paginationParams?.before,
      after: paginationParams?.after,
      sortKey: sortParams?.sortKey,
      reverse: sortParams?.reverse,
      filters: queryFilterParams?.queryFilter,
    },
  })

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
    setFilters(f)
  }

  const onUpdateFiltersDesktop = (items: ListBoxItem[] | undefined, key: string) => {
    setFilters((prev) => {
      const rest = prev.filter((filter) => filter.key !== key)
      const original = filtersData().filter((filter) => filter.key === key)[0]
      const actual: FilterData = {
        ...original,
        filterValuesSelected: items?.map((x: { name: string }) => x.name) || [],
      }
      return [...rest, actual]
    })
  }

  const renderFilterDesktop = (key: string, hasTranslatedValues: boolean) => (
    <Listbox
      items={filters.filter((filter) => filter.key === key)[0].filterValues?.map((x) => ({ name: x })) || []}
      hasTranslatedValues={hasTranslatedValues}
      translationPrefix={`pages.catalogue.filters.${key}`}
      value={filters.filter((filter) => filter.key === key)[0].filterValuesSelected?.map((fv) => ({ name: fv }))}
      multiple={true}
      onChange={(v) => onUpdateFiltersDesktop(v, key)}
    />
  )

  const renderForYouProducts = () => {
    return (
      <div className="flex justify-center my-20">
        <Typography>{t('error.unavailable.text')}</Typography>
      </div>
    )
  }

  const renderDiscoverProducts = () => {
    if (
      loading ||
      !filters.length ||
      !filters.every((filter) => filter.filterValues && filter.filterValues?.length > 0)
    ) {
      return (
        <div className="flex h-64 mb-32 justify-center items-center">
          <Loader />
        </div>
      )
    }
    if (error || !pageInfo) {
      return <ErrorPrompt promptAction={() => history.go(0)} />
    }

    return (
      <>
        <div className="hidden md:flex gap-x-4 mt-8">
          <div className="md:w-1/4">{renderFilterDesktop('beanType', false)}</div>
          <div className="md:w-1/4">{renderFilterDesktop('vendor', false)}</div>
          <div className="md:w-1/4">{renderFilterDesktop('origin', true)}</div>
          <div className="md:w-1/4">{renderFilterDesktop('packageSize', false)}</div>
        </div>
        <div className="flex gap-x-4 justify-end mt-4">
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
                initialFilters={filters}
                onUpdateFilters={(f: FilterData[]) => onUpdateFiltersMobile(f)}
              />
            )}
          </div>
          {['1', '2', '3'].map((fillBlock) => (
            <div key={`fill-block-${fillBlock}`} className="hidden md:block md:w-1/4" />
          ))}
          <div className="w-1/2 md:w-1/4">
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
                <ProductTile key={`title-${i}`} productNode={node} />
              </Link>
            )
          })}
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
