import { Listbox as HUIListbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import algoliasearch from 'algoliasearch'
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Configure,
  Hits,
  InstantSearch,
  SearchBox,
  SortBy,
  usePagination,
  UsePaginationProps,
  useRefinementList,
  UseRefinementListProps,
} from 'react-instantsearch-hooks-web'
import { Link } from 'react-router-dom'
import { Checkbox, Tag, TagType, Typography, TypographySize, TypographyType } from 'src/components'
import { Pagination } from 'src/components/Pagination'
import { formatPrice } from 'src/utils'

const searchClient = algoliasearch('UJO1LDXRBG', 'ae9617f85b12371cbdfbe18d4c727fcc')

type RawHit = {
  id: string
  title: string
  image: string
  product_image: string
  vendor: string
  inventory_quantity: number
  meta: {
    my_fields?: {
      decaf: string
      origin: string[]
      coffee_type: string
      price_per_kg: number
    }
  }
  variants_min_price: number
  variants_max_price: number
}

const Hit = ({ hit }: { hit: RawHit }) => {
  // console.log(hit)
  const { t } = useTranslation()
  const featured = false
  const showFrom = true
  const { id, image, title, vendor, inventory_quantity: totalInventory, variants_min_price, variants_max_price } = hit
  // const { origin, decaf, coffee_type, price_per_kg } = hit.meta.my_fields
  const origin = hit.meta.my_fields?.origin
  const decaf = hit.meta.my_fields?.decaf
  const coffee_type = hit.meta.my_fields?.coffee_type
  const price_per_kg = hit.meta.my_fields?.price_per_kg

  const outOfStock = totalInventory !== undefined && totalInventory !== null && totalInventory <= 0
  const textLineClassNames = outOfStock
    ? 'text-coreUI-text-tertiary'
    : featured
    ? 'mt-1 text-coreUI-text-secondary'
    : 'text-coreUI-text-secondary'

  return (
    <Link to={`/product/${id}`} key={`product-tile-link-${id}`}>
      <div className="flex pt-8 md:px-6">
        <div className="flex justify-center items-center shrink-0 self-center relative w-32 h-32">
          <div className="flex justify-center items-center rounded-full bg-coreUI-background-images w-32 h-32">
            <img src={image} alt={title} className="w-28 max-h-28" />
            {decaf && decaf === 'true' && (
              <Tag type={TagType.Decaf} value="Decaf" small={true} className="absolute top-2 left-0" />
            )}
          </div>
        </div>

        <div className="flex flex-col w-full justify-start pl-4">
          <Typography
            as="div"
            type={TypographyType.Label}
            size={TypographySize.Base}
            className={outOfStock ? 'text-coreUI-text-tertiary' : ''}
          >
            {title}
          </Typography>
          <Typography
            as="div"
            type={TypographyType.Paragraph}
            size={TypographySize.Base}
            className="flex flex-col w-full justify-start"
          >
            {vendor}
          </Typography>
          {origin && (
            <Typography
              as="div"
              type={TypographyType.Paragraph}
              size={TypographySize.Base}
              className={textLineClassNames}
            >
              {origin.map((x, idx) =>
                idx === origin.length - 1
                  ? t(`pages.catalogue.filters.origin.values.${x}`)
                  : t(`pages.catalogue.filters.origin.values.${x}`) + ', ',
              )}
            </Typography>
          )}

          {coffee_type && (
            <Typography
              as="div"
              type={TypographyType.Paragraph}
              size={TypographySize.Base}
              className={textLineClassNames}
            >
              {coffee_type}
            </Typography>
          )}

          <div className="flex items-baseline">
            {featured ? (
              <Typography
                as="div"
                type={TypographyType.Label}
                size={TypographySize.Large}
                className={`mr-1 mt-1${outOfStock ? ' text-gray-400' : ''}`}
              >
                {showFrom && t('pages.catalogue.tile.from') + ' '}
                {formatPrice(variants_min_price)}
              </Typography>
            ) : (
              <Typography
                type={TypographyType.Label}
                size={TypographySize.Base}
                className={`mr-1${outOfStock ? ' text-coreUI-text-tertiary' : ''}`}
              >
                {showFrom && t('pages.catalogue.tile.from') + ' '}
                {formatPrice(variants_min_price)}
              </Typography>
            )}
            {price_per_kg && (
              <Typography
                type={TypographyType.Paragraph}
                size={TypographySize.Tiny}
                className={outOfStock ? 'text-coreUI-text-tertiary' : 'text-coreUI-text-secondary'}
              >
                ({formatPrice(price_per_kg)}/kg)
              </Typography>
            )}
          </div>
          {outOfStock && (
            <Typography type={TypographyType.Paragraph} size={TypographySize.Tiny} className="text-negative">
              {t('pages.product.transactional.outOfStock')}
            </Typography>
          )}
        </div>
      </div>
    </Link>
  )
}

interface ListboxFilterProps extends UseRefinementListProps {
  translationPrefix?: string
}

const ListboxFilter = (props: ListboxFilterProps) => {
  const { items, refine } = useRefinementList(props)
  const { t } = useTranslation()
  const { attribute, translationPrefix } = props
  const activeItems = items.filter((item) => item.isRefined)
  const filterName = t(`pages.catalogue.filters.${attribute}`)

  const renderButton = (open: boolean) => {
    const renderIcon = () => {
      if (open) {
        return <ChevronUpIcon className="-mr-1 ml-2 h-6 w-6" aria-hidden="true" />
      }
      return <ChevronDownIcon className="-mr-1 ml-2 h-6 w-6" aria-hidden="true" />
    }

    const classNames = ['block', 'truncate']

    return (
      <HUIListbox.Button
        className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
        data-testid="button-listbox"
      >
        <Typography size={TypographySize.Base} className={classNames.join(' ')}>
          {filterName} {activeItems.length > 0 && ` (${activeItems.length})`}
        </Typography>
        {renderIcon()}
      </HUIListbox.Button>
    )
  }

  const getDifference = (arr1: any[], arr2: any[]) => {
    const added = arr1.filter((item) => !arr2.includes(item))
    const removed = arr2.filter((item) => !arr1.includes(item))
    return added.length > 0 ? added[0] : removed[0]
  }

  const onChangeHandler = (newItems: RefinementListItem[]) => {
    const updatedItem = getDifference(activeItems, newItems)
    refine(updatedItem.value)
  }

  return (
    <div className={'w-auto min-w-fit max-w-xs relative'} {...props}>
      <HUIListbox value={activeItems} onChange={onChangeHandler} multiple={true}>
        {({ open }) => (
          <>
            <div className="grid grid-cols-2 items-end"></div>
            {renderButton(open)}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HUIListbox.Options className="absolute z-10 min-w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 border border-coreUI-background-images focus:outline-none">
                {items.map((option, idx) => (
                  <div key={idx}>
                    <HUIListbox.Option
                      data-testid={`option-${idx}`}
                      className={({ active }) =>
                        `cursor-pointer select-none relative py-2 pl-8 pr-4 ${
                          active ? 'bg-brand-grey-whisper' : 'bg-transparent'
                        }`
                      }
                      value={option}
                    >
                      {() => {
                        return (
                          <>
                            <span
                              className={`block truncate flex align-middle ${
                                option.isRefined ? 'font-semibold' : 'font-normal'
                              } `}
                            >
                              {translationPrefix ? t(`${translationPrefix}.${option.value}`) : option.value}
                            </span>
                            {option.isRefined ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                                <CheckIcon className="w-5 h-5 text-brand-green-club" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )
                      }}
                    </HUIListbox.Option>
                  </div>
                ))}
              </HUIListbox.Options>
            </Transition>
          </>
        )}
      </HUIListbox>
    </div>
  )
}

const CheckboxFilter = (props: UseRefinementListProps) => {
  const { items, refine } = useRefinementList(props)
  const { t } = useTranslation()
  const { attribute } = props
  const isSelected = items.find((item) => item.value === 'true')?.isRefined || false

  const onToggle = () => {
    refine('true')
  }

  return (
    <Checkbox
      name={attribute}
      text={t(`pages.catalogue.filters.${attribute}`)}
      selected={isSelected}
      disabled={items.length < 2}
      toggleSelected={onToggle}
    />
  )
}

const MyPagination = (props: UsePaginationProps) => {
  const { currentRefinement, isFirstPage, isLastPage, refine } = usePagination(props)
  return (
    <Pagination
      hasPreviousPage={!isFirstPage}
      hasNextPage={!isLastPage}
      previous={() => refine(currentRefinement - 1)}
      next={() => refine(currentRefinement + 1)}
    />
  )
}

const Search: React.FC = () => {
  return (
    <InstantSearch indexName="products" searchClient={searchClient} routing={true}>
      <Configure
        distinct={true}
        hitsPerPage={6}
        facetFilters={['product_type:-Accessories', 'product_type:-Equipment']}
      />

      <div className="flex flex-row justify-end my-4">
        <SearchBox
          placeholder="Search"
          classNames={{
            input: 'rounded-full border-2 border-gray-50 px-4 py-1',
            submitIcon: '-ml-6',
            resetIcon: 'hidden',
            reset: 'hidden',
          }}
        />
      </div>

      <div>
        <div className="flex flex-row justify-end space-between space-x-4">
          <div className="flex flex-row justify-start my-4">
            <CheckboxFilter attribute="meta.my_fields.decaf" />
          </div>

          <div>
            <ListboxFilter attribute="meta.my_fields.coffee_type" sortBy={['name:asc']} />
          </div>

          <div>
            <ListboxFilter attribute="meta.my_fields.aroma" sortBy={['name:asc']} />
          </div>

          <div>
            <ListboxFilter attribute="meta.my_fields.bean_type" sortBy={['name:asc']} />
          </div>

          <div>
            <ListboxFilter
              attribute="meta.my_fields.origin"
              sortBy={['name:asc']}
              translationPrefix="pages.catalogue.filters.origin.values"
            />
          </div>

          <div>
            <ListboxFilter attribute="vendor" sortBy={['name:asc']} />
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
          root: 'flex flex-row justify-end',
          select: 'rounded-full border border-coreUI-text-tertiary px-4 py-2 bg-white ',
        }}
      />

      <Hits
        hitComponent={Hit}
        classNames={{ root: 'mb-8', list: 'grid gap-2 grid-cols-3 md:grid-cols-2 xl:grid-cols-3' }}
      />
      <MyPagination />
    </InstantSearch>
  )
}

export default Search
