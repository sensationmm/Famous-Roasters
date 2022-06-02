import React from 'react'
import { useTranslation } from 'react-i18next'
import { Guide, ImageCheckbox, Typography, TypographySize, TypographyType } from 'src/components'

import { TasteFinderFieldHandlerProps } from '..'

interface TestPartialScreenDataItem {
  name: string
  image: string
  text: string
  selectedText: string
}

interface TestPartialScreenProps extends TasteFinderFieldHandlerProps {
  screenKey: string
  screenData: TestPartialScreenDataItem[]
}

export const _Taste: React.FC<TestPartialScreenProps> = ({
  screenKey,
  screenData,
  currentData,
  updateData,
}: TestPartialScreenProps) => {
  const { t } = useTranslation()

  const handleDataChange = (selected: boolean, name: string) => {
    if (!selected) {
      updateData({ name: screenKey, value: undefined })
    } else {
      updateData({ name: screenKey, value: name })
    }
  }

  const getCurrentFieldData = () => currentData.find((e) => e.name === screenKey)?.value || undefined

  const guideImages = screenData.map((x) => x.image)

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-white">
      <div className="p-6 md:w-5/6">
        <Typography
          as="h1"
          type={TypographyType.Heading}
          size={TypographySize.Tiny}
          className="flex md:text-2xl md:leading-8 xl:text-3xl xl:leading-10"
        >
          {t(`pages.tasteFinder.steps.${screenKey}.text`)}
        </Typography>
        <Guide screenKey={screenKey} images={guideImages} className="mt-4" />
      </div>
      <div className="relative flex w-full overflow-x-auto gap-x-10 snap-x xl:justify-center">
        <div className="w-1/12 pr-12 -mx-2.5 h-80 relative shrink-0 snap-start scroll-auto" />
        {screenData.map((item, idx) => (
          <ImageCheckbox
            key={`imagecheckbox-${idx}`}
            name={item.name}
            imageSrc={item.image}
            text={item.text}
            selectedText={item.selectedText}
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
