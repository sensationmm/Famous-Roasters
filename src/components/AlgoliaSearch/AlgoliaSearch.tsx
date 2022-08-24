import algoliasearch from 'algoliasearch'
import { useTranslation } from 'react-i18next'
import { Configure, Hits, InstantSearch, SearchBox, SortBy } from 'react-instantsearch-hooks-web'
import CheckboxFilter from 'src/components/AlgoliaSearch/CheckboxFilter'
import Hit from 'src/components/AlgoliaSearch/Hit'

import { FiltersMenuMobile } from './FiltersMenuMobile'
import ListboxFilter from './ListboxFilter'
import Pagination from './Pagination'
import SingleSelectFilter from './SingleSelectFilter'

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID || '',
  process.env.REACT_APP_ALGOLIA_API_KEY || '',
)

const Search: React.FC = () => {
  const { t } = useTranslation()
  return (
    <InstantSearch indexName="products" searchClient={searchClient} routing={true}>
      <Configure
        distinct={true} // show products, not variants
        hitsPerPage={6}
        maxValuesPerFacet={100}
        facetFilters={['product_type:-Accessories', 'product_type:-Equipment']}
      />

      <div className="flex flex-row justify-between mt-6 mb-4">
        <SingleSelectFilter
          attribute="meta.my_fields.coffee_type"
          defaultText={t('pages.catalogue.filters.meta.my_fields.coffee_type')}
        />
        <SearchBox
          placeholder={t('pages.catalogue.search.placeholder')}
          classNames={{
            input: 'rounded-full border border-coreUI-text-tertiary px-4 py-2 w-48 md:w-96',
            submitIcon: '-ml-6',
            resetIcon: 'hidden',
            reset: 'hidden',
          }}
        />
      </div>

      <div className="flex flex-row justify-end space-between space-x-4 my-2">
        <div className="my-3 w-full">
          <CheckboxFilter attribute="meta.my_fields.decaf" />
        </div>

        {/* Filters desktop */}
        <div className="hidden md:flex gap-x-4">
          <ListboxFilter attribute="meta.my_fields.aroma" showSwatches />
          <ListboxFilter attribute="meta.my_fields.bean_type" />
          <ListboxFilter attribute="meta.my_fields.origin" translationPrefix="pages.catalogue.filters.origin.values" />
          <ListboxFilter attribute="vendor" />
        </div>

        {/* Filters mobile */}
        <div className="w-1/2 md:hidden">
          <FiltersMenuMobile
            filters={[
              { attribute: 'meta.my_fields.coffee_type' },
              { attribute: 'meta.my_fields.aroma', showSwatches: true },
              { attribute: 'meta.my_fields.bean_type' },
              { attribute: 'meta.my_fields.origin', translationPrefix: 'pages.catalogue.filters.origin.values' },
              { attribute: 'vendor' },
            ]}
          />
        </div>
      </div>

      <SortBy
        items={[
          { label: t('pages.catalogue.filters.sort.values.none'), value: 'products' },
          { label: t('pages.catalogue.filters.sort.values.priceAsc'), value: 'products_price_asc' },
          { label: t('pages.catalogue.filters.sort.values.priceDesc'), value: 'products_price_desc' },
          { label: t('pages.catalogue.filters.sort.values.newDesc'), value: 'products_updated_at_desc' },
        ]}
        classNames={{
          root: 'flex flex-row justify-end',
          select: 'rounded-full border border-coreUI-text-tertiary px-4 py-2 bg-white ',
        }}
      />

      <Hits
        hitComponent={Hit}
        classNames={{ root: 'mb-8', list: 'grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3' }}
      />
      <Pagination />
    </InstantSearch>
  )
}

export default Search
