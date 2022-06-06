import React from 'react'
import { useTranslation } from 'react-i18next'
import { GuideType, IconName } from 'src/components'
import { TasteFinderFieldHandlerProps } from 'src/views/TasteFinder'

import { TasteScreen, TasteScreenImageType, TasteScreenItemSize } from '.'

export const Adventurous: React.FC<TasteFinderFieldHandlerProps> = ({
  currentData,
  updateData,
}: TasteFinderFieldHandlerProps) => {
  const { t } = useTranslation()

  const AdventurousData = [
    {
      name: 'conservative',
      iconName: IconName.Sofa,
      text: t('pages.tasteFinder.steps.adventurous.options.option1.text'),
    },
    {
      name: 'adventurous',
      iconName: IconName.Explore,
      text: t('pages.tasteFinder.steps.adventurous.options.option2.text'),
    },
  ]

  return (
    <TasteScreen
      screenKey="adventurous"
      screenData={AdventurousData}
      imageType={TasteScreenImageType.Icon}
      itemSize={TasteScreenItemSize.Large}
      guideType={GuideType.List}
      listGuideItems={2}
      scrollableImages={false}
      currentData={currentData}
      updateData={updateData}
    />
  )
}
