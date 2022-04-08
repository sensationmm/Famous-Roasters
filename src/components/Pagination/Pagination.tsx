import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React from 'react'

interface PaginationProps {
  numPages?: number
}

export const Pagination: React.FC<PaginationProps> = () => {
  return (
    <nav className="border-t border-coreUI-border flex items-center justify-between mb-4">
      <div className="flex-1 flex justify-end">
        <a
          href="#"
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-bold text-coreUI-text-secondary hover:text-coreUI-text-primary"
        >
          <ArrowNarrowLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
        </a>
      </div>
      <div className="flex">
        <a
          href="#"
          className="border-transparent text-coreUI-text-secondary hover:text-coreUI-text-primary border-t-2 pt-4 px-4 inline-flex items-center text-sm font-bold"
        >
          1
        </a>
        <a
          href="#"
          className="text-coreUI-text-primary border-t-2 pt-4 px-4 inline-flex items-center text-sm font-bold"
          aria-current="page"
        >
          2
        </a>
        <a
          href="#"
          className="border-transparent text-coreUI-text-secondary hover:text-coreUI-text-primary border-t-2 pt-4 px-4 inline-flex items-center text-sm font-bold"
        >
          3
        </a>
        <span className="border-transparent text-coreUI-text-secondary border-t-2 pt-4 px-4 inline-flex items-center text-sm font-bold">
          ...
        </span>
        <a
          href="#"
          className="border-transparent text-coreUI-text-secondary hover:text-coreUI-text-primary border-t-2 pt-4 px-4 inline-flex items-center text-sm font-bold"
        >
          8
        </a>
        <a
          href="#"
          className="border-transparent text-coreUI-text-secondary hover:text-coreUI-text-primary border-t-2 pt-4 px-4 inline-flex items-center text-sm font-bold"
        >
          9
        </a>
        <a
          href="#"
          className="border-transparent text-coreUI-text-secondary hover:text-coreUI-text-primary border-t-2 pt-4 px-4 inline-flex items-center text-sm font-bold"
        >
          10
        </a>
      </div>
      <div className="flex-1 flex justify-start">
        <a
          href="#"
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-bold text-coreUI-text-secondary hover:text-coreUI-text-primary"
        >
          <ArrowNarrowRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </nav>
  )
}
