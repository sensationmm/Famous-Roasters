import React from 'react'
import { useTranslation } from 'react-i18next'

import { Icon, IconName, IconSize, Typography, TypographyType } from '../index'

interface OriginProductionSpecsProps {
  flavourNotes?: string
  origin?: string
  producer?: string
  altitude?: string
  variety?: string
  processing?: string
}

export const OriginProductionSpecs: React.FC<OriginProductionSpecsProps> = ({
  flavourNotes,
  origin,
  producer,
  altitude,
  variety,
  processing,
}: OriginProductionSpecsProps) => {
  const { t } = useTranslation()
  const flavourNotesFormattedData = flavourNotes && flavourNotes.replace(', ', ' • ').replace(',', ' • ')
  const originFormattedData =
    origin &&
    origin
      .replace(', ', ',')
      .split(',')
      .map((x) => ' ' + t(`pages.catalogue.filters.origin.values.${x}`))
      .toString()

  const renderOriginProductionSpecs = (key: string, iconName: IconName, value: string) => {
    return (
      <div className="flex">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-brand-grey-whisper flex items-center justify-center">
            <Icon name={iconName} size={IconSize.md} />
          </div>
        </div>
        <div className="flex flex-col ml-2">
          <Typography as="div" type={TypographyType.Label} className="text-coreUI-text-secondary">
            {t(`pages.product.originProcessing.characteristics.${key}`)}
          </Typography>
          <Typography type={TypographyType.Paragraph}>{value}</Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {flavourNotesFormattedData &&
        renderOriginProductionSpecs('flavourNotes', IconName.Taste, flavourNotesFormattedData)}
      {originFormattedData && renderOriginProductionSpecs('origin', IconName.Origin, originFormattedData)}
      {producer && renderOriginProductionSpecs('producer', IconName.Producer, producer)}
      {altitude && renderOriginProductionSpecs('altitude', IconName.Altitude, altitude)}
      {variety && renderOriginProductionSpecs('variety', IconName.Variety, variety)}
      {processing && renderOriginProductionSpecs('processing', IconName.Processing, processing)}
    </div>
  )
}
