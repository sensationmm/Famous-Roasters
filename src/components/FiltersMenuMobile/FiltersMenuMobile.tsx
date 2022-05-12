import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/outline'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  FilterData,
  FilterMobile,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

interface FiltersProps {
  onUpdateFilters: (f: FilterData[]) => void
  initialFilters: FilterData[]
}

export const FiltersMenuMobile: React.FC<FiltersProps> = ({ onUpdateFilters, initialFilters }: FiltersProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const [filters, setFilters] = useState<FilterData[]>(initialFilters)

  const closeFilter = (key: string) => {
    const changingFilter = filters.filter((filter) => filter.key === key)[0]
    const idx = filters.indexOf(changingFilter)
    const updatedFilter = { ...changingFilter, isOpen: false }
    setOpen(true)
    setFilters((prev) => [...prev.slice(0, idx), updatedFilter, ...prev.slice(idx + 1, prev.length)])
  }

  const openFilter = (key: string) => {
    const changingFilter = filters.filter((filter) => filter.key === key)[0]
    const idx = filters.indexOf(changingFilter)
    const updatedFilter = { ...changingFilter, isOpen: true }
    setFilters((prev) => [...prev.slice(0, idx), updatedFilter, ...prev.slice(idx + 1, prev.length)])
  }

  const updateFilter = (key: string, filterValuesSelected: string[]) => {
    const changingFilter = filters.filter((filter) => filter.key === key)[0]
    const idx = filters.indexOf(changingFilter)
    const updatedFilter = { ...changingFilter, filterValuesSelected }
    setFilters((prev) => [...prev.slice(0, idx), updatedFilter, ...prev.slice(idx + 1, prev.length)])
  }

  const resetAllFilters = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setFilters((prev) => prev.map(({ filterValuesSelected, ...rest }) => rest))
  }

  const filtersApplied = filters.reduce((a, { filterValuesSelected }) => a + (filterValuesSelected?.length || 0), 0)

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40" onClose={setOpen}>
          {filters.map((filter) => (
            <FilterMobile
              key={`filter-${filter.key}`}
              filter={filter}
              show={filter.isOpen}
              back={() => closeFilter(filter.key)}
              update={(key: string, filterValuesSelected: string[]) => updateFilter(key, filterValuesSelected)}
            />
          ))}
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
                  {filtersApplied > 0 && ` (${filtersApplied})`}
                </Typography>
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => resetAllFilters()}
                  data-testid="button-filters-menu-remove"
                >
                  <span className="sr-only">{t(`pages.catalogue.filters.common.filtersMenu.removeFilter`)}</span>
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-coreUI-text-tertiary">
                {filters.map((filter) => (
                  <div
                    key={`filter-${filter.key}`}
                    className="flex justify-between px-5 py-5 border-b border-coreUI-text-tertiary cursor-pointer"
                    data-testid={`button-filter-mobile-${filter.key}`}
                    onClick={() => openFilter(filter.key)}
                  >
                    <div className="flex">
                      {filter?.filterValuesSelected && filter.filterValuesSelected.length > 0 && (
                        <CheckIcon className="w-5 h-5 mr-2 text-brand-green-club" aria-hidden="true" />
                      )}
                      <Typography className="inline-flex">
                        {t(`pages.catalogue.filters.${filter.key}.label`)}
                        {filter?.filterValuesSelected &&
                          filter.filterValuesSelected.length > 0 &&
                          ` (${filter.filterValuesSelected.length})`}
                      </Typography>
                    </div>
                    <ChevronRightIcon className="inline-flex h-6 w-6" aria-hidden="true" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-12 mx-5">
                <Button
                  emphasis={ButtonEmphasis.Secondary}
                  size={ButtonSize.lg}
                  className="w-full justify-center"
                  onClick={() => {
                    onUpdateFilters(filters)
                    setOpen(false)
                  }}
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
        <Typography size={TypographySize.Base} className="block truncate">
          {t(`pages.catalogue.filters.common.filtersMenu.filter`)}
          {filtersApplied > 0 && ` (${filtersApplied})`}
        </Typography>
        <ChevronRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </button>
    </>
  )
}
