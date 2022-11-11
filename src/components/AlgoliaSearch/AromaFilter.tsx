import xor from 'lodash/xor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useClearRefinements, useCurrentRefinements, useInstantSearch } from 'react-instantsearch-hooks-web'
import { BeanScaleTag, Dialog, Icon, IconName, Typography, TypographySize } from 'src/components'

import { Size, Type } from '../Typography/Typography'
import { FilterMobileWrapper } from './FilterMobileWrapper'
import { getActiveFiltersCount } from './searchUtils'

const ranges = [
  [1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10],
]

export const tasteProfileAttributes = [
  'meta.my_fields.bitterness',
  'meta.my_fields.acidity',
  'meta.my_fields.sweetness',
  'meta.my_fields.body',
]

const AromaFilter: React.FC = () => {
  const { t } = useTranslation()
  const { indexUiState, setIndexUiState } = useInstantSearch()

  const renderFilter = (attribute: string) => {
    const currentValues = indexUiState.refinementList && indexUiState.refinementList[attribute]

    const handleOnClick = (tasteLevel: number) => {
      const range = ranges[tasteLevel - 1]
      const nextValues = xor(currentValues, range.map((i) => i.toString()).sort())
      setIndexUiState({
        ...indexUiState,
        refinementList: {
          ...indexUiState.refinementList,
          [attribute]: nextValues,
        },
      })
    }

    const isTasteLevelActive = (tasteLevel: number): boolean => {
      if (currentValues === undefined) return false
      const range = ranges[tasteLevel - 1]
      return range.every((i) => currentValues.includes(i.toString()))
    }

    const getCaption = (attribute: string): string => {
      const tasteLevels = [1, 2, 3]
        .filter((level) => isTasteLevelActive(level))
        .map((level) => t(`pages.catalogue.filters.tasteProfileCaptions.levels.${level}`))
      switch (tasteLevels.length) {
        case 1:
          return t(`pages.catalogue.filters.tasteProfileCaptions.${attribute}_one`, { count: 1, level: tasteLevels[0] })
        case 2:
          return t(`pages.catalogue.filters.tasteProfileCaptions.${attribute}_two`, {
            count: 2,
            level1: tasteLevels[0],
            level2: tasteLevels[1],
          })
        default:
          return t('pages.catalogue.filters.tasteProfileCaptions.noPreference')
      }
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
              <BeanScaleTag value={val} variant={isTasteLevelActive(val) ? 'solid' : 'outline'} />
            </button>
          ))}
        </div>

        <div className="my-4">
          <Typography type={Type.Paragraph} size={Size.Small}>
            {getCaption(attribute)}
          </Typography>
        </div>
      </div>
    )
  }

  return <div className="p-5 gap-y-4">{tasteProfileAttributes.map((attribute) => renderFilter(attribute))}</div>
}

export const AromaFilterButton: React.FC = () => {
  const { t } = useTranslation()
  const { items } = useCurrentRefinements()
  const { activeFilters } = getActiveFiltersCount(['tasteProfile'], items)
  const activeValuesCount = activeFilters['tasteProfile']

  const renderButton = () => (
    <button
      className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
      data-testid="button-filters-menu-open"
    >
      <Typography size={TypographySize.Base} className="block truncate">
        {t('pages.catalogue.filters.tasteProfile')}
        {activeValuesCount > 0 && ` (${activeValuesCount})`}
      </Typography>
      <Icon
        name={IconName.ChevronDown}
        className="-mr-1 ml-2 mt-1 h-4 w-4 fill-brand-black stroke-brand-black"
        aria-hidden="true"
      />
    </button>
  )

  return <Dialog trigger={renderButton()} body={<AromaFilter />} title={t('pages.catalogue.filters.tasteProfile')} />
}

interface AromaFilterMobileProps {
  show: boolean
  back: () => void
}

export const AromaFilterMobile: React.FC<AromaFilterMobileProps> = ({ show, back }) => {
  const { t } = useTranslation()
  const { refine: clearRefinements } = useClearRefinements({ includedAttributes: tasteProfileAttributes })
  const { items } = useCurrentRefinements()
  const { activeFilters } = getActiveFiltersCount(['tasteProfile'], items)
  const activeValuesCount = activeFilters['tasteProfile']

  return (
    <FilterMobileWrapper
      show={show}
      back={back}
      nrActiveValues={activeValuesCount}
      clear={() => clearRefinements()}
      title={t('pages.catalogue.filters.tasteProfile')}
    >
      <AromaFilter />
    </FilterMobileWrapper>
  )
}
