import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon, IconName, IconSize, Typography, TypographySize } from 'src/components'

interface BeanScaleTagProps {
  value: number
}

export const BeanScaleTag: React.FC<BeanScaleTagProps> = ({ value }) => {
  const { t } = useTranslation()

  const beansInScale = () => {
    switch (value) {
      case 1:
        return (
          <>
            <Icon name={IconName.BeanFill} size={IconSize.xs} />
            <Icon name={IconName.BeanOutline} size={IconSize.xs} className="ml-0.5" />
            <Icon name={IconName.BeanOutline} size={IconSize.xs} className="ml-0.5" />
          </>
        )
      case 2:
        return (
          <>
            <Icon name={IconName.BeanFill} size={IconSize.xs} />
            <Icon name={IconName.BeanFill} size={IconSize.xs} className="ml-0.5" />
            <Icon name={IconName.BeanOutline} size={IconSize.xs} className="ml-0.5" />
          </>
        )
      case 3:
        return (
          <>
            <Icon name={IconName.BeanFill} size={IconSize.xs} className="ml-0.5" />
            <Icon name={IconName.BeanFill} size={IconSize.xs} className="ml-0.5" />
            <Icon name={IconName.BeanFill} size={IconSize.xs} className="ml-0.5" />
          </>
        )
    }
  }

  return (
    <div>
      <div className="inline-flex items-center rounded-full px-3 py-1 bg-coreUI-background-images">
        {beansInScale()}
        <Typography size={TypographySize.Tiny} className="ml-2">
          {t(`pages.product.sections.tasteProfile.scale.${value}`)}
        </Typography>
      </div>
    </div>
  )
}
