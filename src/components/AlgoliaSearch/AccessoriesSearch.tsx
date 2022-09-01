import algoliasearch from 'algoliasearch'
import { useTranslation } from 'react-i18next'
import { Configure, Hits, InstantSearch, SearchBox, SortBy } from 'react-instantsearch-hooks-web'
import Hit from 'src/components/AlgoliaSearch/Hit'

import Pagination from './Pagination'
import SingleSelectFilter from './SingleSelectFilter'
import Stats from './Stats'

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID || '',
  process.env.REACT_APP_ALGOLIA_API_KEY || '',
)

const AccessoriesSearch: React.FC = () => {
  const { t } = useTranslation()

  return (
    <InstantSearch indexName="products" searchClient={searchClient} routing={true}>
      <Configure
        distinct={true} // show products, not variants
        hitsPerPage={12}
        maxValuesPerFacet={100}
        facetFilters={['collections:equipment', 'meta.my_fields.publishedToFrontend:true']}
      />

      {/* Top row: Method, Decaf (mobile), Query */}
      <div className="md:flex gap-x-4 mt-6 mb-4">
        <SingleSelectFilter
          attribute="meta.my_fields.accessory_type"
          defaultText={t('pages.catalogue.filters.meta.my_fields.accessory_type')}
          big
        />

        <SearchBox
          placeholder={t('pages.catalogue.search.placeholderAccessories')}
          classNames={{
            root: 'ml-auto mt-4 md:mt-0',
            loadingIndicator: 'hidden',
            input:
              'rounded-full border border-coreUI-text-tertiary px-6 py-2 w-full md:w-96 focus:outline-2 focus:outline-offset-2 focus:outline-primary/30 focus:border-brand-black',
            submitIcon: '-ml-6',
            resetIcon: 'hidden',
            reset: 'hidden',
          }}
        />
      </div>

      {/* Bottom row: Stats (desktop), Filters (mobile), Sorting*/}
      <div className="flex flex-row space-between gap-x-4 my-4">
        <div className="w-1/2">
          <Stats />
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

      <Hits
        hitComponent={Hit}
        classNames={{ root: 'mb-8', list: 'grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3' }}
      />
      <Pagination />
    </InstantSearch>
  )
}

export default AccessoriesSearch
