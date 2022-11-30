import { useTranslation } from 'react-i18next'
import { Configure, SearchBox, SortBy, useInstantSearch } from 'react-instantsearch-hooks-web'
import { useParams } from 'react-router-dom'
import { capitalize } from 'src/utils/formatters'

import { renderSearchContent } from './CoffeeSearch'
import Pagination from './Pagination'
import SingleSelectFilter from './SingleSelectFilter'
import Stats from './Stats'

const AccessoriesSearch: React.FC = () => {
  const { t } = useTranslation()
  const search = useInstantSearch()
  const productHits = search?.results?.nbHits
  const numberOfHitsToShow = 12
  const { productType } = useParams()

  const collection = productType === 'accessories' ? 'equipment' : productType

  return (
    <>
      <Configure
        distinct={true} // show products, not variants
        hitsPerPage={12}
        maxValuesPerFacet={100}
        facetFilters={[`collections:${collection}`, 'meta.my_fields.publishedToFrontend:true']}
      />

      {/* Top row: Method, Decaf (mobile), Query */}
      <div className="md:flex gap-x-4 mt-6 mb-4">
        <SingleSelectFilter
          attribute="meta.my_fields.accessory_type"
          defaultText={t('pages.catalogue.filters.meta.my_fields.accessory_type')}
          big
        />

        <SearchBox
          placeholder={t(`pages.catalogue.search.placeholder${capitalize(collection as string)}`)}
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
              { label: t('pages.catalogue.filters.sort.values.newest'), value: 'products_most_recent' },
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

      {renderSearchContent('accessory', search.results, productHits, numberOfHitsToShow)}
      <Pagination />
    </>
  )
}

export default AccessoriesSearch
