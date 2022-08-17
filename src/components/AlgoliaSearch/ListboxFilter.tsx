import { Listbox as HUIListbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web'
import { Typography, TypographySize } from 'src/components'

function getDifference<T>(arr1: Array<T>, arr2: Array<T>) {
  const added = arr1.filter((item) => !arr2.includes(item))
  const removed = arr2.filter((item) => !arr1.includes(item))
  return added.length > 0 ? added[0] : removed[0]
}
interface ListboxFilterProps extends UseRefinementListProps {
  translationPrefix?: string
}

const ListboxFilter = (props: ListboxFilterProps) => {
  const { items, refine } = useRefinementList({ sortBy: ['name:asc'], ...props })
  const { t } = useTranslation()
  const { attribute, translationPrefix } = props
  const activeItems = items.filter((item) => item.isRefined)
  const filterName = t(`pages.catalogue.filters.${attribute}`)

  const renderButton = (open: boolean) => {
    const renderIcon = () => {
      if (open) {
        return <ChevronUpIcon className="-mr-1 ml-2 mt-1 h-4 w-4" aria-hidden="true" />
      }
      return <ChevronDownIcon className="-mr-1 ml-2 mt-1 h-4 w-4" aria-hidden="true" />
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

export default ListboxFilter
