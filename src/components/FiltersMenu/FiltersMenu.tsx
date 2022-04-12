import React from 'react'
import { Typography, TypographySize } from 'src/components'

export const FiltersMenu: React.FC = () => {
  return (
    <button
      className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
      data-testid="button-filters-menu"
      onClick={() => alert('Hello world!')}
    >
      <Typography size={TypographySize.Small} className="block truncate">
        Filter
      </Typography>
    </button>
  )
}
