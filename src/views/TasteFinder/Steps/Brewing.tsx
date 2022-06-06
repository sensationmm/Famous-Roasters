import React from 'react'
import { useTranslation } from 'react-i18next'
import { GuideType, IconName } from 'src/components'
import { TasteFinderFieldHandlerProps } from 'src/views/TasteFinder'

import { TasteScreen, TasteScreenImageType } from '.'

export const Brewing: React.FC<TasteFinderFieldHandlerProps> = ({
  currentData,
  updateData,
}: TasteFinderFieldHandlerProps) => {
  const { t } = useTranslation()

  const BrewingData = [
    {
      name: 'french',
      iconName: IconName.FrenchPress,
      text: t('pages.tasteFinder.steps.brewing.options.option1.text'),
    },
    {
      name: 'aeropress',
      iconName: IconName.Aeropress,
      text: t('pages.tasteFinder.steps.brewing.options.option2.text'),
    },
    {
      name: 'v60',
      iconName: IconName.V60,
      text: t('pages.tasteFinder.steps.brewing.options.option3.text'),
    },
    {
      name: 'moka',
      iconName: IconName.Moka,
      text: t('pages.tasteFinder.steps.brewing.options.option4.text'),
    },
    {
      name: 'chemex',
      iconName: IconName.Chemex,
      text: t('pages.tasteFinder.steps.brewing.options.option5.text'),
    },
    {
      name: 'espresso',
      iconName: IconName.Espresso,
      text: t('pages.tasteFinder.steps.brewing.options.option6.text'),
    },
  ]

  return (
    <TasteScreen
      screenKey="brewing"
      screenData={BrewingData}
      imageType={TasteScreenImageType.Icon}
      guideType={GuideType.Text}
      scrollableImages={false}
      currentData={currentData}
      updateData={updateData}
    />
  )
}
