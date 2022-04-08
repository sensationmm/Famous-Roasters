import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface PaginationProps {
  hasNextPage: boolean
  hasPreviousPage: boolean
  next: () => void
  previous: () => void
}

const getButtonClassNames = (disabled: boolean): string => {
  const classNames: string[] = [
    'border-t-2',
    'border-transparent',
    'pt-4',
    'pr-1',
    'inline-flex',
    'items-center',
    'text-sm',
    'font-bold',
  ]

  // disabled
  if (disabled) {
    classNames.push('text-coreUI-text-tertiary')
  } else {
    classNames.push('text-coreUI-text-secondary', 'hover:text-coreUI-text-primary')
  }

  return classNames.join(' ')
}

export const Pagination: React.FC<PaginationProps> = ({ hasNextPage, hasPreviousPage, next, previous }) => {
  const { t } = useTranslation()

  return (
    <nav className="border-t border-coreUI-border flex items-center justify-between mb-4">
      <div className="flex-1 flex justify-end -mt-0.5 mr-2">
        <button
          onClick={previous}
          disabled={!hasPreviousPage}
          className={getButtonClassNames(!hasPreviousPage)}
          data-testid="pagination-previous"
        >
          <ArrowNarrowLeftIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
          <span>{t('pages.catalogue.pagination.previous')}</span>
        </button>
      </div>
      <div className="flex-1 flex justify-start -mt-0.5 ml-2">
        <button
          onClick={next}
          disabled={!hasNextPage}
          className={getButtonClassNames(!hasNextPage)}
          data-testid="pagination-next"
        >
          <span>{t('pages.catalogue.pagination.next')}</span>
          <ArrowNarrowRightIcon className="ml-1.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}
