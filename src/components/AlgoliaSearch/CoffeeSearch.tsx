import { TrashIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { SearchResults } from 'react-instantsearch-core'
import {
  Configure,
  Hits,
  SearchBox,
  SortBy,
  useClearRefinements,
  useCurrentRefinements,
  useInstantSearch,
  useRefinementList,
  useSortBy,
} from 'react-instantsearch-hooks-web'
import { ProductTileLoader, Typography, TypographySize, TypographyType } from 'src/components'
import CheckboxFilter from 'src/components/AlgoliaSearch/CheckboxFilter'
import Hit from 'src/components/AlgoliaSearch/Hit'
import { parseHtmlSafely } from 'src/utils'
import { YouMightLike } from 'src/views/Product/YouMightLike'

import { AromaFilterButton } from './AromaFilter'
import { FiltersMenuMobile } from './FiltersMenuMobile'
import ListboxFilter from './ListboxFilter'
import Pagination from './Pagination'
import SingleSelectFilter from './SingleSelectFilter'
import Stats from './Stats'

interface CustomSearch extends SearchResults {
  exhaustive?: {
    nbHits: boolean
  }
}

export const renderSearchContent = (
  type: 'coffee' | 'accessory',
  searchResults: CustomSearch,
  productHits: number,
  numberOfHitsToShow: number,
) => {
  const { t } = useTranslation()
  const finished = typeof searchResults?.exhaustive !== 'undefined'

  return (
    <>
      {productHits === 0 &&
        (finished ? (
          <>
            <div className="xl:w-1/2 pt-6 xl:pt-0">
              <Typography type={TypographyType.Heading} size={TypographySize.Tiny} as="p" className="mb-2">
                {t('pages.catalogue.noResults.title')}
              </Typography>
              <Typography size={TypographySize.Large} as="p" className="text-coreUI-text-tertiary">
                {t('pages.catalogue.noResults.text')}
              </Typography>
            </div>
            <div className="mt-6 pt-6 border-t border-coreUI-border">
              <Typography as="p" type={TypographyType.Heading} size={TypographySize.Tiny} className="text-bold">
                {t('pages.catalogue.noResults.youMightLike')}
              </Typography>
              <div className="p-6 pt-0">
                <YouMightLike productId={'0'} filter={type} />
              </div>
            </div>
          </>
        ) : (
          <div className="grid gap-2 grid-cols-1 mb-8 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(numberOfHitsToShow)].map((_, count) => (
              <ProductTileLoader key={`loader-${count}`} />
            ))}
          </div>
        ))}
      <Hits
        hitComponent={Hit}
        classNames={{ root: 'mb-8', list: 'grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3' }}
      />
    </>
  )
}

export const returnSortItems = () => {
  const { t } = useTranslation()
  return [
    { label: t('pages.catalogue.filters.sort.values.none'), value: 'products' },
    { label: t('pages.catalogue.filters.sort.values.newest'), value: 'products_most_recent' },
    { label: t('pages.catalogue.filters.sort.values.priceAsc'), value: 'products_price_asc' },
    { label: t('pages.catalogue.filters.sort.values.priceDesc'), value: 'products_price_desc' },
  ]
}

export type SearchScreenProps = {
  getDescription: (filter: string | undefined) => string
}

const CoffeeSearch: React.FC<SearchScreenProps> = ({ getDescription }) => {
  const { t } = useTranslation()
  const search = useInstantSearch()
  const productHits = search?.results?.nbHits
  const numberOfHitsToShow = 12
  // Initialize tasteProfile filters so we don't lose their state when dropdown closes
  useRefinementList({ attribute: 'meta.my_fields.bitterness' })
  useRefinementList({ attribute: 'meta.my_fields.acidity' })
  useRefinementList({ attribute: 'meta.my_fields.sweetness' })
  useRefinementList({ attribute: 'meta.my_fields.body' })
  const { items: activeRefinements } = useCurrentRefinements()
  const { refine: clearRefinements } = useClearRefinements()
  const sortItems = returnSortItems()
  const { refine: clearSort } = useSortBy({
    items: sortItems,
  })

  const type = activeRefinements
    .find((x) => x.label === 'meta.my_fields.coffee_type')
    ?.refinements[1].value.toString()
    .toLowerCase()

  const getCoffeeText = () => {
    switch (type) {
      case 'filter':
        return 'filter'
      case 'espresso':
        return 'espresso'
      case 'omni':
        return 'omni'
      default:
        return 'all'
    }
  }

  return (
    <>
      <Configure
        distinct={true} // show products, not variants
        hitsPerPage={numberOfHitsToShow}
        maxValuesPerFacet={100}
        facetFilters={['collections:coffee', 'meta.my_fields.publishedToFrontend:true']}
      />

      {/* Top row: Method, Decaf (mobile), Query */}
      <div className="xl:flex gap-x-4 mt-6 mb-4 items-center">
        <div className="flex gap-x-4 items-center">
          <SingleSelectFilter
            attribute="meta.my_fields.coffee_type"
            defaultText={t('pages.catalogue.filters.meta.my_fields.coffee_type')}
            big
          />

          <Typography size={TypographySize.Tiny} className="text-coreUI-text-tertiary">
            {t(`pages.catalogue.coffeeFiltersExplanationText.${getCoffeeText()}`)}
          </Typography>
        </div>

        {/* Decaf filter (mobile) */}
        <div className="my-4 xl:hidden">
          <CheckboxFilter attribute="meta.my_fields.decaf" />
        </div>

        <SearchBox
          placeholder={t('pages.catalogue.search.placeholderCoffee')}
          classNames={{
            root: 'ml-auto',
            loadingIndicator: 'hidden',
            input:
              'rounded-full border border-coreUI-text-tertiary px-6 py-2 w-full xl:w-96 focus:outline-2 focus:outline-offset-2 focus:outline-primary/30 focus:border-brand-black',
            submitIcon: '-ml-6',
            resetIcon: 'hidden',
            reset: 'hidden',
          }}
        />
      </div>

      {/* Middle row: Filters (desktop) */}
      <div className="hidden xl:flex">
        <div className="flex flex-row gap-x-4 justify-end w-full">
          {/* Decaf filter (desktop) */}
          <div className="mr-auto mt-2">
            <CheckboxFilter attribute="meta.my_fields.decaf" />
          </div>

          {/* Filter dropdowns (desktop) */}
          <ListboxFilter attribute="meta.my_fields.aroma" showSwatches />
          <ListboxFilter attribute="meta.my_fields.bean_type" />
          <ListboxFilter attribute="meta.my_fields.origin" translationPrefix="pages.catalogue.filters.origin.values" />
          <ListboxFilter attribute="vendor" />
          <AromaFilterButton />
          {activeRefinements.length > 0 && (
            <button
              type="button"
              onClick={() => {
                clearRefinements()
                clearSort('products')
              }}
              data-testid="button-filters-menu-remove-dt"
            >
              <span className="sr-only">{t(`pages.catalogue.filters.common.filtersMenu.removeFilter`)}</span>
              <TrashIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom row: Stats (desktop), Filters (mobile), Sorting*/}
      <div className="flex flex-row space-between gap-x-4 my-4">
        <div className="hidden xl:flex w-1/2">
          <Stats />
        </div>

        {/* Filters mobile */}
        <div className="w-1/2 xl:hidden">
          <FiltersMenuMobile
            filters={[
              { type: 'list', attribute: 'meta.my_fields.aroma', showSwatches: true },
              { type: 'aroma', attribute: 'tasteProfile' },
              { type: 'list', attribute: 'meta.my_fields.bean_type' },
              {
                type: 'list',
                attribute: 'meta.my_fields.origin',
                translationPrefix: 'pages.catalogue.filters.origin.values',
              },
              { type: 'list', attribute: 'vendor' },
            ]}
          />
        </div>

        <div className="w-1/2 flex flex-row justify-end">
          <SortBy
            items={sortItems}
            classNames={{
              root: 'chevron w-full md:w-48',
              select: 'rounded-full border border-coreUI-text-tertiary px-4 py-2 bg-white w-full',
            }}
          />
        </div>
      </div>

      <div className="xl:hidden">
        <Stats />
      </div>

      {renderSearchContent('coffee', search.results, productHits, numberOfHitsToShow)}
      {productHits > 0 && <Pagination />}

      <div
        className="my-8"
        dangerouslySetInnerHTML={{
          __html: parseHtmlSafely(getDescription(type)),
        }}
      />
    </>
  )
}

export default CoffeeSearch
