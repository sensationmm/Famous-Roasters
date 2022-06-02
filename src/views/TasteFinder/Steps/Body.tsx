import React from 'react'
import { useTranslation } from 'react-i18next'
import image1 from 'src/assets/images/tasteFinder/01-coffee-leicht.webp'
import image2 from 'src/assets/images/tasteFinder/02-coffee-mittel.webp'
import image3 from 'src/assets/images/tasteFinder/03-coffee-hoch.webp'

import { TasteFinderFieldHandlerProps } from '..'
import { TasteScreen } from '.'

export const Body: React.FC<TasteFinderFieldHandlerProps> = ({
  currentData,
  updateData,
}: TasteFinderFieldHandlerProps) => {
  const { t } = useTranslation()

  const BodyData = [
    {
      name: '1',
      image: image1,
      text: t('pages.tasteFinder.steps.body.options.option1.text'),
      selectedText: t('pages.tasteFinder.steps.body.options.option1.selectedText'),
    },
    {
      name: '2',
      image: image2,
      text: t('pages.tasteFinder.steps.body.options.option2.text'),
      selectedText: t('pages.tasteFinder.steps.body.options.option2.selectedText'),
    },
    {
      name: '3',
      image: image3,
      text: t('pages.tasteFinder.steps.body.options.option3.text'),
      selectedText: t('pages.tasteFinder.steps.body.options.option3.selectedText'),
    },
  ]

  return <TasteScreen screenKey="body" screenData={BodyData} currentData={currentData} updateData={updateData} />
}
