import { Dialog as HUIDialog, Transition } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/solid'
import xor from 'lodash/xor'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useInstantSearch } from 'react-instantsearch-hooks-web'
import { BeanScaleTag, Dialog, Typography, TypographySize, TypographyType } from 'src/components'

import { Size, Type } from '../Typography/Typography'

const ranges = [
  [1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10],
]

export const AromaFilter: React.FC = () => {
  const { t } = useTranslation()
  const attributes = ['bitterness', 'acidity_', 'sweetness', 'body']
  const { indexUiState, setIndexUiState } = useInstantSearch()

  const renderFilter = (attribute: string) => {
    const filterName = `meta.my_fields.${attribute}`
    const currentValues = indexUiState.refinementList && indexUiState.refinementList[filterName]
    console.log(filterName, currentValues)

    const handleOnClick = (tasteLevel: number) => {
      const range = ranges[tasteLevel - 1]
      const nextValues = xor(currentValues, range.map((i) => i.toString()).sort())
      console.log('new values:', filterName, nextValues)
      setIndexUiState({
        ...indexUiState,
        refinementList: {
          ...indexUiState.refinementList,
          [filterName]: nextValues,
        },
      })
    }

    const isButtonActive = (tasteLevel: number): boolean => {
      if (currentValues === undefined) return false
      const range = ranges[tasteLevel - 1]
      return range.every((i) => currentValues.includes(i.toString()))
    }

    return (
      <div key={attribute}>
        <div className="my-4">
          <Typography type={Type.Label} size={Size.Small}>
            {t(`pages.catalogue.filters.tasteProfileFilterNames.${attribute}`)}
          </Typography>
        </div>

        <div className="flex flex-row gap-x-4">
          {[1, 2, 3].map((val) => (
            <button onClick={() => handleOnClick(val)} key={`${attribute}-${val}`}>
              <BeanScaleTag value={val} variant={isButtonActive(val) ? 'solid' : 'outline'} />
            </button>
          ))}
        </div>

        <div className="my-4">
          <Typography type={Type.Paragraph} size={Size.Small}>
            caption
          </Typography>
        </div>
      </div>
    )
  }

  return <div className=" gap-y-4">{attributes.map((attribute) => renderFilter(attribute))}</div>
}

export const AromaFilterButton: React.FC = () => {
  const { t } = useTranslation()
  const renderButton = () => (
    <button
      className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
      data-testid="button-filters-menu-open"
    >
      <Typography size={TypographySize.Base} className="block truncate">
        {t('pages.catalogue.filters.tasteProfile')}
      </Typography>
      <ChevronRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
    </button>
  )

  return <Dialog trigger={renderButton()} body={<AromaFilter />} title="Flavours" unmount={false} />
}

interface AromaFilterMobileProps {
  show: boolean
  back: () => void
}
export const AromaFilterMobile: React.FC<AromaFilterMobileProps> = ({ show, back }) => {
  const { t } = useTranslation()
  return (
    <Transition.Root show={show} as={Fragment}>
      <HUIDialog as="div" className="fixed inset-0 flex z-40" onClose={() => back()}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <HUIDialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
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
            {/* Top row */}
            <div className="px-5 pt-5 pb-5 flex justify-between">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={() => back()}
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
                {t(`pages.catalogue.filters.tasteProfile`)}
                {/* {selectedItems.length > 0 && ` (${selectedItems.length})`} */}
              </Typography>
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                // onClick={() => clearRefinements()}
                data-testid="button-filter-mobile-remove"
              >
                <span className="sr-only">{t(`pages.catalogue.filters.common.filterMobile.removeFilter`)}</span>
                <TrashIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <AromaFilter />
          </div>
        </Transition.Child>
      </HUIDialog>
    </Transition.Root>
  )
}
