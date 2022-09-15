import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonEmphasis, ButtonSize, Typography, TypographySize, TypographyType } from 'src/components'

interface FilterMobileWrapperProps {
  title: string
  nrActiveValues?: number
  show: boolean
  back: () => void
  clear: () => void
  children: React.ReactNode
}

export const FilterMobileWrapper: React.FC<FilterMobileWrapperProps> = ({
  title,
  nrActiveValues = 0,
  show,
  back,
  clear,
  children,
}: FilterMobileWrapperProps) => {
  const { t } = useTranslation()

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
            {/* Header */}
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
                {title}
                {nrActiveValues > 0 && ` (${nrActiveValues})`}
              </Typography>
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={() => clear()}
                data-testid="button-filter-mobile-remove"
              >
                <span className="sr-only">{t(`pages.catalogue.filters.common.filterMobile.removeFilter`)}</span>
                <TrashIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="border-t border-coreUI-text-tertiary overflow-auto grow">
              <Dialog.Panel>{children}</Dialog.Panel>
            </div>

            {/* Footer */}
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
