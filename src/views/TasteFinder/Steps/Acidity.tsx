import React from 'react'
import { useTranslation } from 'react-i18next'
import image1 from 'src/assets/images/tasteFinder/01-fruit-leicht.webp'
import image2 from 'src/assets/images/tasteFinder/02-fruit-mittel.webp'
import image3 from 'src/assets/images/tasteFinder/03-fruit-hoch.webp'
import { TasteFinderFieldHandlerProps } from 'src/views/TasteFinder'

import { TasteScreen, TasteScreenImageType } from '.'

export const Acidity: React.FC<TasteFinderFieldHandlerProps> = ({
  currentData,
  updateData,
}: TasteFinderFieldHandlerProps) => {
  const { t } = useTranslation()

  const AcidityData = [
    {
      name: '1',
      image: image1,
      text: t('pages.tasteFinder.steps.acidity.options.option1.text'),
      selectedText: t('pages.tasteFinder.steps.acidity.options.option1.selectedText'),
    },
    {
      name: '2',
      image: image2,
      text: t('pages.tasteFinder.steps.acidity.options.option2.text'),
      selectedText: t('pages.tasteFinder.steps.acidity.options.option2.selectedText'),
    },
    {
      name: '3',
      image: image3,
      text: t('pages.tasteFinder.steps.acidity.options.option3.text'),
      selectedText: t('pages.tasteFinder.steps.acidity.options.option3.selectedText'),
    },
  ]

  return (
    <TasteScreen
      screenKey="acidity"
      screenData={AcidityData}
      imageType={TasteScreenImageType.Image}
      currentData={currentData}
      updateData={updateData}
    />
  )
}
