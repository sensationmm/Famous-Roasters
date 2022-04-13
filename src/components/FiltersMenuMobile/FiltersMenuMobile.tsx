import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  FilterMobile,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

interface FiltersData {
  key: string
}

const filtersData: FiltersData[] = [
  { key: 'pricePerKg' },
  { key: 'beanType' },
  { key: 'roaster' },
  { key: 'origin' },
  { key: 'packageSize' },
]

export const FiltersMenuMobile: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [showFilter, setShowFilter] = useState<string | null>(null)
  const { t } = useTranslation()

  const closeFilter = () => {
    setOpen(true)
    setShowFilter(null)
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40" onClose={setOpen}>
          <FilterMobile filterKey={showFilter} show={!!showFilter} back={closeFilter} />
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
            <div className="relative w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-5 pt-5 pb-5 flex justify-between">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                  data-testid="button-filters-menu-close"
                >
                  <span className="sr-only">{t(`pages.catalogue.filters.common.filtersMenu.close`)}</span>
                  <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <Typography
                  type={TypographyType.Paragraph}
                  size={TypographySize.Large}
                  className="text-coreUI-text-secondary"
                >
                  {t(`pages.catalogue.filters.common.filtersMenu.filterOptions`)}
                </Typography>
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => alert('remove')}
                  data-testid="button-filters-menu-remove"
                >
                  <span className="sr-only">{t(`pages.catalogue.filters.common.filtersMenu.removeFilter`)}</span>
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-coreUI-text-tertiary">
                {filtersData.map((filter) => (
                  <div
                    key={`filter-${filter.key}`}
                    className="flex justify-between px-5 py-5 border-b border-coreUI-text-tertiary"
                    data-testid={`button-filter-mobile-${filter.key}`}
                    onClick={() => setShowFilter(filter.key)}
                  >
                    <Typography className="inline-flex">{t(`pages.catalogue.filters.${filter.key}.label`)}</Typography>
                    <ChevronRightIcon className="inline-flex h-6 w-6" aria-hidden="true" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-12 mx-5">
                <Button
                  emphasis={ButtonEmphasis.Secondary}
                  size={ButtonSize.lg}
                  className="w-full justify-center"
                  onClick={() => setOpen(false)}
                  data-testid="button-filters-menu-results"
                >
                  {t(`pages.catalogue.filters.common.filtersMenu.showResults`)}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      <button
        className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
        data-testid="button-filters-menu-open"
        onClick={() => setOpen(true)}
      >
        <Typography size={TypographySize.Small} className="block truncate">
          {t(`pages.catalogue.filters.common.filtersMenu.filter`)}
        </Typography>
        <ChevronRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </button>
    </>
  )
}
