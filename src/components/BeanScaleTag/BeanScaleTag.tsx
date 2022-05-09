import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon, IconName, IconSize, Typography, TypographySize } from 'src/components'

interface BeanScaleTagProps {
  value: number
}

export enum Intensity {
  light = 'light',
  medium = 'medium',
  strong = 'strong',
}

export const BeanScaleTag: React.FC<BeanScaleTagProps> = ({ value }) => {
  const { t } = useTranslation()

  const scale = (value: number) => {
    if (value <= 3) {
      return Intensity.light
    }
    if (value > 7) {
      return Intensity.strong
    }
    return Intensity.medium
  }

  const intensity = scale(value)

  const beansInScale = () => {
    switch (intensity) {
      case Intensity.light:
        return (
          <>
            <Icon name={IconName.BeanFill} size={IconSize.sm} />
            <Icon name={IconName.BeanOutline} size={IconSize.sm} className="ml-0.5" />
            <Icon name={IconName.BeanOutline} size={IconSize.sm} className="ml-0.5" />
          </>
        )
      case Intensity.medium:
        return (
          <>
            <Icon name={IconName.BeanFill} size={IconSize.sm} />
            <Icon name={IconName.BeanFill} size={IconSize.sm} className="ml-0.5" />
            <Icon name={IconName.BeanOutline} size={IconSize.sm} className="ml-0.5" />
          </>
        )
      case Intensity.strong:
        return (
          <>
            <Icon name={IconName.BeanFill} size={IconSize.sm} className="ml-0.5" />
            <Icon name={IconName.BeanFill} size={IconSize.sm} className="ml-0.5" />
            <Icon name={IconName.BeanFill} size={IconSize.sm} className="ml-0.5" />
          </>
        )
    }
  }

  return (
    <div>
      <div className="inline-flex items-center rounded-full px-3 py-1 bg-coreUI-background-images">
        {beansInScale()}
        <Typography size={TypographySize.Tiny} className="ml-2">
          {t(`pages.product.sections.tasteProfile.scale.${intensity}`)}
        </Typography>
      </div>
    </div>
  )
}
