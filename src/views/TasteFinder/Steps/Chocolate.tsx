import React from 'react'
import { useTranslation } from 'react-i18next'
import image1 from 'src/assets/images/tasteFinder/01-chocolate-leicht.webp'
import image2 from 'src/assets/images/tasteFinder/02-chocolate-mittel.webp'
import image3 from 'src/assets/images/tasteFinder/03-chocolate-hoch.webp'
import { Typography, TypographySize, TypographyType } from 'src/components'

import { TasteFinderFieldHandlerProps } from '..'

export const Chocolate: React.FC<TasteFinderFieldHandlerProps> = ({
  currentData,
  updateData,
}: TasteFinderFieldHandlerProps) => {
  const { t } = useTranslation()

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ name: e.target.name, value: e.target.value })
  }

  const getCurrentFieldData = (fieldName: string) => currentData.find((e) => e.name === fieldName)?.value || ''

  return (
    <div className="flex-grow flex items-center justify-center bg-white">
      <div className="p-6 md:w-5/6">
        <Typography
          as="h1"
          type={TypographyType.Heading}
          size={TypographySize.Tiny}
          className="flex md:text-2xl md:leading-8 xl:text-3xl xl:leading-10"
        >
          {t('pages.tasteFinder.steps.chocolate.text')}
        </Typography>
        <div className="mt-20 snap-x flex flex-row">
          <div className="w-72 h-80 relative scroll-auto">
            <div className="w-72 h-72 absolute rounded-full bg-brand-grey-whisper" />
            <img src={image1} alt="" className="absolute -top-8" />
            <Typography
              as="div"
              type={TypographyType.Heading}
              size={TypographySize.Small}
              className="absolute font-syne font-normal text-center bottom-4"
            >
              {t('pages.tasteFinder.steps.chocolate.options.option1.text')}
            </Typography>
          </div>
          <div className="w-72 h-80 relative scroll-auto">
            <div className="w-72 h-72 absolute rounded-full bg-brand-grey-whisper" />
            <img src={image2} alt="" className="absolute -top-8" />
            <Typography
              as="div"
              type={TypographyType.Heading}
              size={TypographySize.Small}
              className="absolute font-syne font-normal text-center bottom-4"
            >
              {t('pages.tasteFinder.steps.chocolate.options.option2.text')}
            </Typography>
          </div>
          <div className="w-72 h-80 relative scroll-auto">
            <div className="w-72 h-72 absolute rounded-full bg-brand-grey-whisper" />
            <img src={image3} alt="" className="absolute -top-8" />
            <Typography
              as="div"
              type={TypographyType.Heading}
              size={TypographySize.Small}
              className="absolute font-syne font-normal text-center bottom-4"
            >
              {t('pages.tasteFinder.steps.chocolate.options.option3.text')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
