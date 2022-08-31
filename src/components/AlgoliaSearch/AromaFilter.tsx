import { ChevronRightIcon } from '@heroicons/react/solid'
import { t } from 'i18next'
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRange, useRefinementList } from 'react-instantsearch-hooks-web'
import { BeanScaleTag, Dialog, Typography, TypographySize } from 'src/components'
import { toValueInHumanScale } from 'src/utils'
import { toRange } from 'src/utils/attributeScaleUtils'

import { Size, Type } from '../Typography/Typography'

type RefinementListItem = {
  value: string
  label: string
  highlighted?: string
  count: number
  isRefined: boolean
}

export declare type RangeMin = number | undefined
export declare type RangeMax = number | undefined
export declare type RangeBoundaries = [RangeMin, RangeMax]
export declare type Range = {
  min: RangeMin
  max: RangeMax
}

// const ranges: Record<number, number[]> = { 1: [1, 2, 3], 2: [4, 5, 6, 7], 3: [8, 9, 10] }

const ranges = [
  [1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10],
]

export const AromaFilter: React.FC = () => {
  const { t } = useTranslation()
  const attributes = ['bitterness', 'acidity_', 'sweetness', 'body']
  const filters: Record<string, { items: RefinementListItem[]; refine: (value: string) => void }> = {}

  filters['bitterness'] = useRefinementList({ attribute: 'meta.my_fields.bitterness', sortBy: ['name:asc'] })
  filters['acidity_'] = useRefinementList({ attribute: 'meta.my_fields.acidity_', sortBy: ['name:asc'] })
  filters['sweetness'] = useRefinementList({ attribute: 'meta.my_fields.sweetness', sortBy: ['name:asc'] })
  filters['body'] = useRefinementList({ attribute: 'meta.my_fields.body', sortBy: ['name:asc'] })

  const renderFilter = (attribute: string) => {
    const filter = filters[attribute]

    const handleOnClick = (val: number) => {
      const range = ranges[val - 1]
      range.map((i) => filter.refine(i.toString()))
      // filter.refine(range)
    }

    const isButtonActive = (index: number): boolean => {
      const range = ranges[index - 1]
      const activeValues = filter.items.filter((item) => item.isRefined).map((item) => parseInt(item.value))
      return range.every((i) => activeValues.includes(i))
    }

    return (
      <div key={attribute}>
        <div className="my-4">
          <Typography type={Type.Label} size={Size.Small}>
            {t(`pages.catalogue.filters.tasteProfile.${attribute}`)}
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
  const renderButton = () => (
    <button
      className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
      data-testid="button-filters-menu-open"
    >
      <Typography size={TypographySize.Base} className="block truncate">
        Flavours
      </Typography>
      <ChevronRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
    </button>
  )

  return <Dialog trigger={renderButton()} body={<AromaFilter />} title="Flavours" unmount={false} />
}
