import React from 'react'
import { useTranslation } from 'react-i18next'
import image1 from 'src/assets/images/tasteFinder/01-chocolate-leicht.webp'
import image2 from 'src/assets/images/tasteFinder/02-chocolate-mittel.webp'
import image3 from 'src/assets/images/tasteFinder/03-chocolate-hoch.webp'

import { TasteFinderFieldHandlerProps } from '..'
import { TasteScreen } from '.'

export const Chocolate: React.FC<TasteFinderFieldHandlerProps> = ({
  currentData,
  updateData,
}: TasteFinderFieldHandlerProps) => {
  const { t } = useTranslation()

  const ChocolateData = [
    {
      name: '1',
      image: image1,
      text: t('pages.tasteFinder.steps.chocolate.options.option1.text'),
      selectedText: t('pages.tasteFinder.steps.chocolate.options.option1.selectedText'),
    },
    {
      name: '2',
      image: image2,
      text: t('pages.tasteFinder.steps.chocolate.options.option2.text'),
      selectedText: t('pages.tasteFinder.steps.chocolate.options.option2.selectedText'),
    },
    {
      name: '3',
      image: image3,
      text: t('pages.tasteFinder.steps.chocolate.options.option3.text'),
      selectedText: t('pages.tasteFinder.steps.chocolate.options.option3.selectedText'),
    },
  ]

  return (
    <TasteScreen screenKey="chocolate" screenData={ChocolateData} currentData={currentData} updateData={updateData} />
  )
}
