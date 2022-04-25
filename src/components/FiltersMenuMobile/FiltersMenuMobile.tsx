import { useQuery } from '@apollo/client'
import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/outline'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Collection } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  ErrorPrompt,
  FilterData,
  FilterMobile,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

export const FiltersMenuMobile: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const GET_VARIANTS_ATTRIBUTES = loader('src/graphql/queries/variantsAttributes.query.graphql')

  const { loading, error, data } = useQuery<Collection>(GET_VARIANTS_ATTRIBUTES)

  const getFilterValues = (key: string) => {
    switch (key) {
      case 'package_size':
      default:
        return Array.from(
          new Set(
            data?.products.nodes
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              .map((productNode) => productNode.variants.nodes.map((variantNode) => variantNode['package_size'].value))
              .flat()
              .sort((a, b) => (parseFloat(a) > parseFloat(b) ? 1 : -1)),
          ),
        )
    }
  }

  const filtersData: FilterData[] = [
    { key: 'pricePerKg', isOpen: false },
    { key: 'beanType', isOpen: false },
    { key: 'roaster', isOpen: false },
    { key: 'origin', isOpen: false },
    { key: 'packageSize', isOpen: false, filterType: 'enum', filterValues: getFilterValues('package_size') },
  ]

  const [filters, setFilters] = useState<FilterData[]>([])

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

  const resetAllFilters = () => setFilters(filtersData)

  useEffect(() => {
    setFilters(filtersData)
  }, [!loading])

  if (!data || loading)
    return (
      <div
        className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
        data-testid="button-filters-menu-open-loading"
      >
        <Typography size={TypographySize.Small} className="block truncate">
          {t(`pages.catalogue.filters.common.filtersMenu.filter`)}
        </Typography>
        <ChevronRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </div>
    )

  if (error) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

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
              update={(key: string, filterValuesSelected: string[]) => updateFilter(filter.key, filterValuesSelected)}
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
