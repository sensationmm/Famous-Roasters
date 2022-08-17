import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/outline'
import { CheckIcon, ChevronLeftIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useClearRefinements, useRefinementList } from 'react-instantsearch-hooks-web'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  Tag,
  TagSwatch,
  TagType,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

interface FilterMobileProps {
  attribute: string
  translationPrefix?: string
  show: boolean
  back: () => void
}

export const FilterMobile: React.FC<FilterMobileProps> = ({
  attribute,
  translationPrefix,
  show,
  back,
}: FilterMobileProps) => {
  const { t } = useTranslation()
  const { items, refine } = useRefinementList({ attribute, sortBy: ['name:asc'] })
  const { refine: clearRefinements } = useClearRefinements({ includedAttributes: [attribute] })
  const selectedItems = items.filter((item) => item.isRefined)

  const renderItem = (value: string, flex: boolean) => (
    <Typography className={flex ? 'inline-flex' : ''}>
      {translationPrefix ? t(`${translationPrefix}.${value}`) : value}
    </Typography>
  )

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 flex z-40" onClose={() => back()}>
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
                {t(`pages.catalogue.filters.${attribute}`)}
                {selectedItems.length > 0 && ` (${selectedItems.length})`}
              </Typography>
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={() => clearRefinements()}
                data-testid="button-filter-mobile-remove"
              >
                <span className="sr-only">{t(`pages.catalogue.filters.common.filterMobile.removeFilter`)}</span>
                <TrashIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="border-t border-coreUI-text-tertiary overflow-auto grow">
              {items.map((item, idx) => (
                <div key={`filter-${attribute}-${idx}`}>
                  <div
                    className="flex justify-between px-5 py-5 border-b border-coreUI-text-tertiary cursor-pointer"
                    onClick={() => refine(item.value)}
                  >
                    {item.isRefined ? (
                      <span className="inline-flex items-center">
                        <CheckIcon className="w-5 h-5 mr-2 text-brand-green-club" aria-hidden="true" />
                        {attribute !== 'meta.my_fields.aroma' ? (
                          renderItem(item.value, false)
                        ) : (
                          <Tag data-testid="filter-selected-tag" type={TagType.Aroma} value={item.value} />
                        )}
                      </span>
                    ) : (
                      <span className="inline-flex items-left">
                        {attribute === 'meta.my_fields.aroma' && (
                          <TagSwatch data-testid="filter-option-tagSwatch" type={TagType.Aroma} value={item.value} />
                        )}
                        {renderItem(item.value, true)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="inset-x-0 mx-5 py-6">
              <Button
                emphasis={ButtonEmphasis.Secondary}
                size={ButtonSize.lg}
                className="w-full justify-center"
                onClick={() => back()}
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
