import { CheckIcon } from '@heroicons/react/solid'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useClearRefinements, useRefinementList } from 'react-instantsearch-hooks-web'
import { Tag, TagSwatch, TagType, Typography } from 'src/components'

import { FilterMobileWrapper } from './FilterMobileWrapper'

interface ListFilterMobileProps {
  attribute: string
  translationPrefix?: string
  show: boolean
  back: () => void
  showSwatches?: boolean
}

export const ListFilterMobile: React.FC<ListFilterMobileProps> = ({
  attribute,
  translationPrefix,
  show,
  back,
  showSwatches,
}: ListFilterMobileProps) => {
  const { t } = useTranslation()
  const { items, refine } = useRefinementList({ attribute, sortBy: ['name:asc'], limit: 100 })
  const { refine: clearRefinements } = useClearRefinements({ includedAttributes: [attribute] })
  const nrActiveValues = items.filter((item) => item.isRefined).length

  const renderItem = (value: string, flex: boolean) => (
    <Typography className={flex ? 'inline-flex' : ''}>
      {translationPrefix ? t(`${translationPrefix}.${value}`) : value}
    </Typography>
  )

  return (
    <FilterMobileWrapper
      title={t(`pages.catalogue.filters.${attribute}`)}
      show={show}
      back={back}
      clear={() => clearRefinements()}
      nrActiveValues={nrActiveValues}
    >
      {/* Content */}
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
                  {showSwatches && (
                    <TagSwatch data-testid="filter-option-tagSwatch" type={TagType.Aroma} value={item.value} />
                  )}
                  {renderItem(item.value, true)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </FilterMobileWrapper>
  )
}
