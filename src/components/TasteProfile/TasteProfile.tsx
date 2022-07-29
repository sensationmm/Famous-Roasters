import { InformationCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BeanScaleTag, Dialog, Drawer, Typography, TypographySize, TypographyType } from 'src/components'
import { toValueInHumanScale } from 'src/utils'

export interface TasteProfileProps {
  acidity: number
  bitterness: number
  body: number
  sweetness: number
}

export const TasteProfile: React.FC<TasteProfileProps> = ({
  acidity,
  bitterness,
  body,
  sweetness,
}: TasteProfileProps) => {
  const { t } = useTranslation()

  const renderProfile = (key: string, parameter: number) => (
    <div>
      <BeanScaleTag value={toValueInHumanScale(parameter)} />
      <div className="inline-flex">
        <Typography type={TypographyType.Label} size={TypographySize.Tiny} className="text-coreUI-text-secondary">
          {t(`pages.product.sections.tasteProfile.parameter.${key}.name`)}
        </Typography>
        <Drawer
          trigger={<InformationCircleIcon className="h-4 w-4 ml-1 text-coreUI-text-secondary cursor-pointer" />}
          title={t(`pages.product.sections.tasteProfile.parameter.${key}.name`)}
          body={
            <Typography as="p" className="text-coreUI-text-secondary p-5">
              {t(`pages.product.sections.tasteProfile.parameter.${key}.description`)}
            </Typography>
          }
          className="flex md:hidden"
        />
        <Dialog
          trigger={<InformationCircleIcon className="h-4 w-4 ml-1 text-coreUI-text-secondary cursor-pointer" />}
          title={t(`pages.product.sections.tasteProfile.parameter.${key}.name`)}
          body={
            <Typography as="p" className="text-coreUI-text-secondary p-5 pt-0">
              {t(`pages.product.sections.tasteProfile.parameter.${key}.description`)}
            </Typography>
          }
          className="hidden md:flex"
        />
      </div>
    </div>
  )

  return (
    <div className="grid gap-4 grid-cols-2 grid-rows-2">
      {renderProfile('acidity', acidity)}
      {renderProfile('bitterness', bitterness)}
      {renderProfile('body', body)}
      {renderProfile('sweetness', sweetness)}
    </div>
  )
}
