import { useTranslation } from 'react-i18next'
import { Configure, Hits, SearchBox, SortBy, useRefinementList } from 'react-instantsearch-hooks-web'
import CheckboxFilter from 'src/components/AlgoliaSearch/CheckboxFilter'
import Hit from 'src/components/AlgoliaSearch/Hit'

import { AromaFilterButton } from './AromaFilter'
import { FiltersMenuMobile } from './FiltersMenuMobile'
import ListboxFilter from './ListboxFilter'
import Pagination from './Pagination'
import SingleSelectFilter from './SingleSelectFilter'
import Stats from './Stats'

const CoffeeSearch: React.FC = () => {
  const { t } = useTranslation()

  // Initialize flavour filters so we don't lose their state when dropdown closes
  useRefinementList({ attribute: 'meta.my_fields.bitterness' })
  useRefinementList({ attribute: 'meta.my_fields.acidity_' })
  useRefinementList({ attribute: 'meta.my_fields.sweetness' })
  useRefinementList({ attribute: 'meta.my_fields.body' })

  return (
    <>
      <Configure
        distinct={true} // show products, not variants
        hitsPerPage={12}
        maxValuesPerFacet={100}
        facetFilters={['collections:coffee', 'meta.my_fields.publishedToFrontend:true']}
      />

      {/* Top row: Method, Decaf (mobile), Query */}
      <div className="md:flex gap-x-4 mt-6 mb-4">
        <SingleSelectFilter
          attribute="meta.my_fields.coffee_type"
          defaultText={t('pages.catalogue.filters.meta.my_fields.coffee_type')}
          big
        />

        {/* Decaf filter (mobile) */}
        <div className="my-4 md:hidden">
          <CheckboxFilter attribute="meta.my_fields.decaf" />
        </div>

        <SearchBox
          placeholder={t('pages.catalogue.search.placeholderCoffee')}
          classNames={{
            root: 'ml-auto',
            loadingIndicator: 'hidden',
            input: 'rounded-full border border-coreUI-text-tertiary px-4 py-2 w-full md:w-96 ',
            submitIcon: '-ml-6',
            resetIcon: 'hidden',
            reset: 'hidden',
          }}
        />
      </div>

      {/* Middle row: Filters (desktop) */}
      <div className="hidden md:flex">
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
          {/* <AromaFilter /> */}
        </div>
      </div>

      {/* Bottom row: Stats (desktop), Filters (mobile), Sorting*/}
      <div className="flex flex-row space-between gap-x-4 my-4">
        <div className="hidden md:flex w-1/2">
          <Stats />
        </div>

        {/* Filters mobile */}
        <div className="w-1/2 md:hidden">
          <FiltersMenuMobile
            filters={[
              { attribute: 'meta.my_fields.aroma', showSwatches: true },
              { attribute: 'meta.my_fields.bean_type' },
              { attribute: 'meta.my_fields.origin', translationPrefix: 'pages.catalogue.filters.origin.values' },
              { attribute: 'vendor' },
            ]}
          />
        </div>

        <div className="w-1/2 flex flex-row justify-end">
          <SortBy
            items={[
              { label: t('pages.catalogue.filters.sort.values.none'), value: 'products' },
              { label: t('pages.catalogue.filters.sort.values.priceAsc'), value: 'products_price_asc' },
              { label: t('pages.catalogue.filters.sort.values.priceDesc'), value: 'products_price_desc' },
            ]}
            classNames={{
              root: 'chevron w-full md:w-48',
              select: 'rounded-full border border-coreUI-text-tertiary px-4 py-2 bg-white w-full',
            }}
          />
        </div>
      </div>

      <div className="md:hidden">
        <Stats />
      </div>

      <Hits
        hitComponent={Hit}
        classNames={{ root: 'mb-8', list: 'grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3' }}
      />
      <Pagination />
    </>
  )
}

export default CoffeeSearch
