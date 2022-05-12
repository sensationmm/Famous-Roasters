import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/outline'
import { CheckIcon, ChevronLeftIcon } from '@heroicons/react/solid'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonEmphasis, ButtonSize, Typography, TypographySize, TypographyType } from 'src/components'

export interface FilterData {
  key: string
  isOpen: boolean
  filterType?: 'enum'
  filterValues?: string[]
  filterValuesSelected?: string[]
  i18nValues?: boolean
}

interface FilterMobileProps {
  filter: FilterData
  show: boolean
  back: (key: string) => void
  update: (key: string, filterValuesSelected: string[]) => void
}

export const FilterMobile: React.FC<FilterMobileProps> = ({ filter, show, back, update }: FilterMobileProps) => {
  const { t } = useTranslation()

  const [activeItems, setActiveItems] = useState<string[]>([])

  useEffect(() => {
    setActiveItems(filter.filterValuesSelected || [])
  }, [filter])

  const handleBack = () => {
    back(filter.key)
  }

  const isSelected = (item: string) => activeItems.indexOf(item) !== -1

  const toggleSelected = (item: string) => {
    if (isSelected(item)) {
      setActiveItems((prev) => prev.filter((x) => x !== item))
      update(
        filter.key,
        activeItems.filter((x) => x !== item),
      )
    } else {
      setActiveItems((prev) => [...prev, item])
      update(filter.key, [...activeItems, item])
    }
  }

  const resetFilter = () => {
    setActiveItems([])
    update(filter.key, [])
  }

  const filtersApplied = filter.filterValuesSelected?.length || 0

  const renderFilterValue = (filterValue: string, flex: boolean) => (
    <Typography className={flex ? 'inline-flex' : ''}>
      {filter.i18nValues ? t(`pages.catalogue.filters.${filter.key}.values.${filterValue}`) : filterValue}
    </Typography>
  )

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 flex z-40" onClose={() => handleBack()}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative w-full bg-white shadow-xl flex flex-col overflow-y-auto justify-between">
            <div className="px-5 pt-5 pb-5 flex justify-between">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={() => handleBack()}
                data-testid="button-filter-mobile-close"
              >
                <span className="sr-only">{t(`pages.catalogue.filters.common.filterMobile.close`)}</span>
                <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Typography
                type={TypographyType.Paragraph}
                size={TypographySize.Large}
                className="text-coreUI-text-secondary"
              >
                {t(`pages.catalogue.filters.${filter?.key}.label`)}
                {filtersApplied > 0 && ` (${filtersApplied})`}
              </Typography>
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={() => resetFilter()}
                data-testid="button-filter-mobile-remove"
              >
                <span className="sr-only">{t(`pages.catalogue.filters.common.filterMobile.removeFilter`)}</span>
                <TrashIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="border-t border-coreUI-text-tertiary overflow-auto grow">
              {filter?.filterType === 'enum' && filter?.filterValues ? (
                filter?.filterValues.map((filterValue: string, idx) => (
                  <div
                    key={`filter-${filter.key}-${idx}`}
                    className="flex justify-between px-5 py-5 border-b border-coreUI-text-tertiary cursor-pointer"
                    data-testid={`button-filter-mobile-${filter.key}-option-${idx}`}
                    onClick={() => toggleSelected(filterValue)}
                  >
                    {isSelected(filterValue) ? (
                      <span className="inline-flex items-center">
                        <CheckIcon className="w-5 h-5 mr-2 text-brand-green-club" aria-hidden="true" />
                        {renderFilterValue(filterValue, false)}
                      </span>
                    ) : (
                      renderFilterValue(filterValue, true)
                    )}
                  </div>
                ))
              ) : (
                <span>Content for the filter key {filter?.key}</span>
              )}
            </div>
            <div className="inset-x-0 mx-5 py-6">
              <Button
                emphasis={ButtonEmphasis.Secondary}
                size={ButtonSize.lg}
                className="w-full justify-center"
                onClick={() => handleBack()}
                data-testid="button-filter-mobile-apply"
              >
                {t(`pages.catalogue.filters.common.filterMobile.apply`)}
              </Button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
