import React from 'react'
import { useTranslation } from 'react-i18next'
import image1 from 'src/assets/images/tasteFinder/01-chocolate-leicht.webp'
import image2 from 'src/assets/images/tasteFinder/02-chocolate-mittel.webp'
import image3 from 'src/assets/images/tasteFinder/03-chocolate-hoch.webp'
import { ImageCheckbox, Typography, TypographySize, TypographyType } from 'src/components'

import { TasteFinderFieldHandlerProps } from '..'

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
    },
    {
      name: '2',
      image: image2,
      text: t('pages.tasteFinder.steps.chocolate.options.option2.text'),
    },
    {
      name: '3',
      image: image3,
      text: t('pages.tasteFinder.steps.chocolate.options.option3.text'),
    },
  ]

  const handleDataChange = (selected: boolean, name: string) => {
    if (!selected) {
      updateData({ name: 'chocolate', value: undefined })
    } else {
      updateData({ name: 'chocolate', value: name })
    }
  }

  const getCurrentFieldData = () => currentData.find((e) => e.name === 'chocolate')?.value || undefined

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-white">
      <div className="p-6 md:w-5/6">
        <Typography
          as="h1"
          type={TypographyType.Heading}
          size={TypographySize.Tiny}
          className="flex md:text-2xl md:leading-8 xl:text-3xl xl:leading-10"
        >
          {t('pages.tasteFinder.steps.chocolate.text')}
        </Typography>
      </div>
      <div className="relative flex w-full overflow-x-auto gap-x-10 snap-x xl:justify-center">
        <div className="w-1/12 pr-12 -mx-2.5 h-80 relative shrink-0 snap-start scroll-auto" />
        {ChocolateData.map((item, idx) => (
          <ImageCheckbox
            key={`imagecheckbox-${idx}`}
            name={item.name}
            imageSrc={item.image}
            text={item.text}
            selected={getCurrentFieldData() === item.name}
            toggleSelected={(selected) => handleDataChange(selected, item.name)}
            className="shrink-0 snap-center scroll-auto"
          />
        ))}
        <div className="w-1/12 pl-12 -mx-2.5 h-80 relative shrink-0 snap-start scroll-auto" />
      </div>
    </div>
  )
}
