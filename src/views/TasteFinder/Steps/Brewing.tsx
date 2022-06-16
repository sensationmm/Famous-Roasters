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
      name: 'French Press',
      iconName: IconName.FrenchPress,
      text: t('pages.tasteFinder.steps.grindType.options.option1.text'),
    },
    {
      name: 'Aeropress',
      iconName: IconName.Aeropress,
      text: t('pages.tasteFinder.steps.grindType.options.option2.text'),
    },
    {
      name: 'Filter',
      iconName: IconName.V60,
      text: t('pages.tasteFinder.steps.grindType.options.option3.text'),
    },
    {
      name: 'Herdkocher/Bialetti',
      iconName: IconName.Moka,
      text: t('pages.tasteFinder.steps.grindType.options.option4.text'),
    },
    {
      name: 'Filter',
      iconName: IconName.Chemex,
      text: t('pages.tasteFinder.steps.grindType.options.option5.text'),
    },
    {
      name: 'Siebträger',
      iconName: IconName.Espresso,
      text: t('pages.tasteFinder.steps.grindType.options.option6.text'),
    },
  ]

  return (
    <TasteScreen
      screenKey="grindType"
      screenData={BrewingData}
      imageType={TasteScreenImageType.Icon}
      guideType={GuideType.Text}
      scrollableImages={false}
      currentData={currentData}
      updateData={updateData}
    />
  )
}
