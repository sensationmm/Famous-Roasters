import algoliasearch from 'algoliasearch'
import { useTranslation } from 'react-i18next'
import { Configure, Hits, InstantSearch, SearchBox, SortBy } from 'react-instantsearch-hooks-web'
import CheckboxFilter from 'src/components/AlgoliaSearch/CheckboxFilter'
import Hit from 'src/components/AlgoliaSearch/Hit'

import { FiltersMenuMobile } from './FiltersMenuMobile'
import ListboxFilter from './ListboxFilter'
import Pagination from './Pagination'

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID || 'UJO1LDXRBG',
  process.env.REACT_APP_ALGOLIA_API_KEY || 'ae9617f85b12371cbdfbe18d4c727fcc',
)

const Search: React.FC = () => {
  const { t } = useTranslation()
  return (
    <InstantSearch indexName="products" searchClient={searchClient} routing={true}>
      <Configure
        distinct={true} // show products, not variants
        hitsPerPage={6}
        facetFilters={['product_type:-Accessories', 'product_type:-Equipment']}
      />

      <div className="flex flex-row justify-end my-3">
        <SearchBox
          placeholder={t('pages.catalogue.search.placeholder')}
          classNames={{
            input: 'rounded-full border border-coreUI-text-tertiary px-4 py-2 w-96',
            submitIcon: '-ml-6',
            resetIcon: 'hidden',
            reset: 'hidden',
          }}
        />
      </div>

      <div>
        <div className="flex flex-row justify-end space-between space-x-4">
          <div className="my-3 w-full">
            <CheckboxFilter attribute="meta.my_fields.decaf" />
          </div>

          {/* Filters desktop */}
          <div className="hidden md:flex gap-x-4">
            <ListboxFilter attribute="meta.my_fields.coffee_type" sortBy={['name:asc']} />
            <ListboxFilter attribute="meta.my_fields.aroma" sortBy={['name:asc']} />
            <ListboxFilter attribute="meta.my_fields.bean_type" sortBy={['name:asc']} />
            <ListboxFilter
              attribute="meta.my_fields.origin"
              sortBy={['name:asc']}
              translationPrefix="pages.catalogue.filters.origin.values"
            />
            <ListboxFilter attribute="vendor" sortBy={['name:asc']} />
          </div>

          {/* Filters mobile */}
          <div className="w-1/2 md:hidden">
            <FiltersMenuMobile
              attributes={[
                'meta.my_fields.coffee_type',
                'meta.my_fields.aroma',
                'meta.my_fields.bean_type',
                'meta.my_fields.origin',
                'vendor',
              ]}
            />
          </div>
        </div>
      </div>

      <SortBy
        items={[
          { label: 'Standard', value: 'products' },
          { label: 'Preis aufsteigend', value: 'products_price_asc' },
          { label: 'Preis absteigend', value: 'products_price_desc' },
          { label: 'Neue zuerst', value: 'products_updated_at_desc' },
        ]}
        classNames={{
          root: 'flex flex-row justify-end mt-1',
          select: 'rounded-full border border-coreUI-text-tertiary px-4 py-2 bg-white ',
        }}
      />

      <Hits
        hitComponent={Hit}
        classNames={{ root: 'mb-8', list: 'grid gap-2 grid-cols-3 md:grid-cols-2 xl:grid-cols-3' }}
      />
      <Pagination />
    </InstantSearch>
  )
}

export default Search
