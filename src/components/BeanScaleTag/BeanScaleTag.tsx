import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon, IconName, IconSize, Typography, TypographySize } from 'src/components'

interface BeanScaleTagProps {
  value: number
  variant?: 'default' | 'outline' | 'solid'
}

export const BeanScaleTag: React.FC<BeanScaleTagProps> = ({ value, variant = 'default' }) => {
  const { t } = useTranslation()

  let bgColor = 'bg-coreUI-background-images'
  let textColor = 'text-brand-black'
  let iconColor = 'stroke-brand-black fill-brand-black'

  switch (variant) {
    case 'outline':
      bgColor = 'bg-coreUI-white'
      break
    case 'solid':
      bgColor = 'bg-brand-black'
      textColor = 'text-white'
      iconColor = 'fill-white stroke-white'
      break
  }

  const beansInScale = () => {
    switch (value) {
      case 1:
        return (
          <>
            <Icon name={IconName.BeanFill} size={IconSize.xs} className={`ml-0.5 ${iconColor}`} />
            <Icon name={IconName.BeanOutline} size={IconSize.xs} className={`ml-0.5 ${iconColor}`} />
            <Icon name={IconName.BeanOutline} size={IconSize.xs} className={`ml-0.5 ${iconColor}`} />
          </>
        )
      case 2:
        return (
          <>
            <Icon name={IconName.BeanFill} size={IconSize.xs} className={`ml-0.5 ${iconColor}`} />
            <Icon name={IconName.BeanFill} size={IconSize.xs} className={`ml-0.5 ${iconColor}`} />
            <Icon name={IconName.BeanOutline} size={IconSize.xs} className={`ml-0.5 ${iconColor}`} />
          </>
        )
      case 3:
        return (
          <>
            <Icon name={IconName.BeanFill} size={IconSize.xs} className={`ml-0.5 ${iconColor}`} />
            <Icon name={IconName.BeanFill} size={IconSize.xs} className={`ml-0.5 ${iconColor}`} />
            <Icon name={IconName.BeanFill} size={IconSize.xs} className={`ml-0.5 ${iconColor}`} />
          </>
        )
    }
  }

  return (
    <div>
      <div
        className={`inline-flex items-center rounded-full px-3 py-1 ${bgColor} ${
          variant === 'outline' ? 'border-2' : ''
        }`}
      >
        {beansInScale()}
        <Typography size={TypographySize.Tiny} className={`ml-2 ${textColor}`}>
          {t(`pages.product.sections.tasteProfile.scale.${value}`)}
        </Typography>
      </div>
    </div>
  )
}
