import { InformationCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BeanScaleTag, Typography, TypographySize, TypographyType } from 'src/components'

interface TasteProfileProps {
  bitterness: number
  acidity: number
  body: number
  sweetness: number
}

export const TasteProfile: React.FC<TasteProfileProps> = ({
  acidity,
  body,
  bitterness,
  sweetness,
}: TasteProfileProps) => {
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 grid-cols-2 grid-rows-2">
      <div>
        <BeanScaleTag value={bitterness} />
        <div className="inline-flex">
          <Typography type={TypographyType.Label} size={TypographySize.Tiny} className="text-coreUI-text-secondary">
            {t('pages.product.sections.tasteProfile.parameter.bitterness')}
          </Typography>
          <InformationCircleIcon className="h-4 w-4 ml-1 text-coreUI-text-secondary" />
        </div>
      </div>
      <div>
        <BeanScaleTag value={acidity} />
        <div className="inline-flex">
          <Typography type={TypographyType.Label} size={TypographySize.Tiny} className="text-coreUI-text-secondary">
            {t('pages.product.sections.tasteProfile.parameter.acidity')}
          </Typography>
          <InformationCircleIcon className="h-4 w-4 ml-1 text-coreUI-text-secondary" />
        </div>
      </div>
      <div>
        <BeanScaleTag value={body} />
        <div className="inline-flex">
          <Typography type={TypographyType.Label} size={TypographySize.Tiny} className="text-coreUI-text-secondary">
            {t('pages.product.sections.tasteProfile.parameter.body')}
          </Typography>
          <InformationCircleIcon className="h-4 w-4 ml-1 text-coreUI-text-secondary" />
        </div>
      </div>
      <div>
        <BeanScaleTag value={sweetness} />
        <div className="inline-flex">
          <Typography type={TypographyType.Label} size={TypographySize.Tiny} className="text-coreUI-text-secondary">
            {t('pages.product.sections.tasteProfile.parameter.sweetness')}
          </Typography>
          <InformationCircleIcon className="h-4 w-4 ml-1 text-coreUI-text-secondary" />
        </div>
      </div>
    </div>
  )
}
