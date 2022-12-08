import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Configure,
  SearchBox,
  SortBy,
  useClearRefinements,
  useCurrentRefinements,
  useInstantSearch,
  useSortBy,
} from 'react-instantsearch-hooks-web'
import { useParams } from 'react-router-dom'
import { parseHtmlSafely } from 'src/utils'
import { capitalize } from 'src/utils/formatters'

import { renderSearchContent, returnSortItems, SearchScreenProps } from './CoffeeSearch'
import Pagination from './Pagination'
import SingleSelectFilter from './SingleSelectFilter'
import Stats from './Stats'

const AccessoriesSearch: React.FC<SearchScreenProps> = ({ getDescription }) => {
  const { t } = useTranslation()
  const search = useInstantSearch()
  const productHits = search?.results?.nbHits
  const numberOfHitsToShow = 12
  const { productType } = useParams()
  const { items: activeRefinements } = useCurrentRefinements()
  const { refine: clearRefinements } = useClearRefinements()
  const sortItems = returnSortItems()
  const { refine: clearSort } = useSortBy({
    items: sortItems,
  })

  const type = activeRefinements
    .find((x) => x.label === 'meta.my_fields.accessory_type')
    ?.refinements[1].value.toString()
    .toLowerCase()

  const collection = productType === 'accessories' ? 'equipment' : productType

  useEffect(() => {
    clearRefinements()
    clearSort('products')
  }, [productType])

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
            items={sortItems}
            classNames={{
              root: 'chevron w-full md:w-48',
              select: 'rounded-full border border-coreUI-text-tertiary px-4 py-2 bg-white w-full',
            }}
          />
        </div>
      </div>

      {renderSearchContent('accessory', search.results, productHits, numberOfHitsToShow)}
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

export default AccessoriesSearch
