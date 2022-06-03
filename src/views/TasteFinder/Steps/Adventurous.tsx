import React from 'react'
import { useTranslation } from 'react-i18next'
import { GuideType, IconName } from 'src/components'
import { TasteFinderFieldHandlerProps } from 'src/views/TasteFinder'

import { TasteScreen, TasteScreenImageType } from '.'

export const Adventurous: React.FC<TasteFinderFieldHandlerProps> = ({
  currentData,
  updateData,
}: TasteFinderFieldHandlerProps) => {
  const { t } = useTranslation()

  const AdventurousData = [
    {
      name: 'french',
      iconName: IconName.FrenchPress,
      text: t('pages.tasteFinder.steps.adventurous.options.option1.text'),
    },
    {
      name: 'aeropress',
      iconName: IconName.Aeropress,
      text: t('pages.tasteFinder.steps.adventurous.options.option2.text'),
    },
  ]

  return (
    <TasteScreen
      screenKey="adventurous"
      screenData={AdventurousData}
      imageType={TasteScreenImageType.Icon}
      guideType={GuideType.List}
      listGuideItems={2}
      scrollable={false}
      currentData={currentData}
      updateData={updateData}
    />
  )
}
