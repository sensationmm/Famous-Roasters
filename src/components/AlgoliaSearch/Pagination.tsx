import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { usePagination, UsePaginationProps } from 'react-instantsearch-hooks-web'

const getButtonClassNames = (disabled: boolean): string => {
  const classNames: string[] = [
    'border-t-2',
    'border-transparent',
    'pt-4',
    'pr-1',
    'inline-flex',
    'items-center',
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

const Pagination = (props: UsePaginationProps) => {
  const { currentRefinement, isFirstPage, isLastPage, refine, pages } = usePagination(props)

  const refineWithScrollToTop = (x: number) => {
    refine(x)

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    window.scroll({
      top: 0,
      behavior: !mediaQuery || mediaQuery.matches ? 'auto' : 'smooth',
    })
  }

  return (
    <nav className="border-t border-coreUI-border flex items-center justify-between mb-8">
      <div className="flex-1 flex justify-end mr-2">
        <button
          onClick={() => refineWithScrollToTop(currentRefinement - 1)}
          disabled={isFirstPage}
          className={getButtonClassNames(isFirstPage)}
          data-testid="pagination-previous"
        >
          <ArrowNarrowLeftIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {pages.map((page) => (
        <div
          onClick={() => refineWithScrollToTop(page)}
          key={page}
          className={`cursor-pointer w-12 h-10 pt-3.5 text-center font-bold text-coreUI-text-tertiary border-t-2 ${
            currentRefinement === page ? ' text-coreUI-text-primary border-black' : ' border-transparent'
          }`}
        >
          {page + 1}
        </div>
      ))}

      <div className="flex-1 flex justify-start -mt-0.5 ml-2">
        <button
          onClick={() => refineWithScrollToTop(currentRefinement + 1)}
          disabled={isLastPage}
          className={getButtonClassNames(isLastPage)}
          data-testid="pagination-next"
        >
          <ArrowNarrowRightIcon className="ml-1.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}

export default Pagination
