import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Guide,
  GuideType,
  IconCheckbox,
  IconName,
  ImageCheckbox,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { TasteFinderFieldHandlerProps } from 'src/views/TasteFinder'

interface TastePartialScreenDataImageItem {
  name: string
  text: string
  image: string
  selectedText?: string
}

interface TastePartialScreenDataIconItem {
  name: string
  text: string
  iconName: IconName
}

export enum TasteScreenImageType {
  Image = 'image',
  Icon = 'icon',
}

interface TastePartialScreenProps extends TasteFinderFieldHandlerProps {
  screenKey: string
  screenData: TastePartialScreenDataImageItem[] | TastePartialScreenDataIconItem[]
  imageType?: TasteScreenImageType
  guideType?: GuideType
  scrollable?: boolean
}

export const _Taste: React.FC<TastePartialScreenProps> = ({
  screenKey,
  screenData,
  imageType = TasteScreenImageType.Image,
  guideType = GuideType.List,
  scrollable = true,
  currentData,
  updateData,
}: TastePartialScreenProps) => {
  const { t } = useTranslation()

  const handleDataChange = (selected: boolean, name: string) => {
    if (!selected) {
      updateData({ name: screenKey, value: undefined })
    } else {
      updateData({ name: screenKey, value: name })
    }
  }

  const getCurrentFieldData = () => currentData.find((e) => e.name === screenKey)?.value || undefined

  const guideImages = screenData.map((x) => ('image' in x ? x.image : undefined))

  const getIconCheckboxContainerClass = (i: number) => {
    switch (i) {
      case 2:
        return 'scroll-auto border-b border-brand-grey-whisper md:border-0 scroll-auto'
      case 5:
        return 'scroll-auto'
      default:
        return 'scroll-auto border-b border-brand-grey-whisper'
    }
  }

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
        <Guide screenKey={screenKey} images={guideImages} guideType={guideType} className="mt-4" />
      </div>
      {scrollable ? (
        <div className="relative flex w-full overflow-x-auto gap-x-10 snap-x xl:justify-center">
          <div className="w-1/12 pr-12 -mx-2.5 h-80 relative shrink-0 snap-start scroll-auto" />
          {screenData.map((item, idx) => {
            if (imageType === 'image') {
              return (
                <ImageCheckbox
                  key={`imagecheckbox-${idx}`}
                  name={item.name}
                  imageSrc={'image' in item ? item.image : null}
                  text={item.text}
                  selectedText={'selectedText' in item ? item.selectedText : undefined}
                  selected={getCurrentFieldData() === item.name}
                  toggleSelected={(selected: boolean) => handleDataChange(selected, item.name)}
                  className={scrollable ? 'shrink-0 snap-center scroll-auto' : ''}
                />
              )
            }
          })}
          <div className="w-1/12 pl-12 -mx-2.5 h-80 relative shrink-0 snap-start scroll-auto" />
        </div>
      ) : (
        <div className="grid gap-x-4 w-full md:w-5/6 md:grid-rows-3 md:grid-cols-2 md:grid-flow-col">
          {screenData.map((item, idx) => {
            if (imageType === 'icon') {
              return (
                <div key={`iconcheckboxcontainer-${idx}`} className={getIconCheckboxContainerClass(idx)}>
                  <IconCheckbox
                    name={item.name}
                    iconName={'iconName' in item ? item.iconName : null}
                    text={item.text}
                    selected={getCurrentFieldData() === item.name}
                    toggleSelected={(selected: boolean) => handleDataChange(selected, item.name)}
                  />
                </div>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}
