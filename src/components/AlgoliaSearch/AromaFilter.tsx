import { ChevronRightIcon } from '@heroicons/react/solid'
import xor from 'lodash/xor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useInstantSearch } from 'react-instantsearch-hooks-web'
import { BeanScaleTag, Dialog, Typography, TypographySize } from 'src/components'

import { Size, Type } from '../Typography/Typography'
import { FilterMobileWrapper } from './FilterMobileWrapper'

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

    const handleOnClick = (tasteLevel: number) => {
      const range = ranges[tasteLevel - 1]
      const nextValues = xor(currentValues, range.map((i) => i.toString()).sort())
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

  const clear = () => {
    console.log('clear aromas')
  }

  return (
    <FilterMobileWrapper
      show={show}
      back={back}
      nrActiveValues={0}
      clear={clear}
      title={t('pages.catalogue.filters.tasteProfile')}
    >
      <AromaFilter />
    </FilterMobileWrapper>
  )
}
