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

export enum TasteScreenItemSize {
  Normal = 'normal',
  Large = 'large',
}

interface TastePartialScreenProps extends TasteFinderFieldHandlerProps {
  screenKey: string
  screenData: TastePartialScreenDataImageItem[] | TastePartialScreenDataIconItem[]
  imageType?: TasteScreenImageType
  itemSize?: TasteScreenItemSize
  guideType?: GuideType
  listGuideItems?: number
  scrollableImages?: boolean
}

export const _Taste: React.FC<TastePartialScreenProps> = ({
  screenKey,
  screenData,
  imageType = TasteScreenImageType.Image,
  itemSize = TasteScreenItemSize.Normal,
  guideType = GuideType.List,
  listGuideItems,
  scrollableImages = true,
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
  const guideIcons = screenData.map((x) => ('iconName' in x ? x.iconName : undefined))

  const getIconCheckboxContainerClass = (i: number) => {
    switch (i) {
      case 3:
        return 'scroll-auto border-b border-brand-grey-whisper md:border-0 scroll-auto'
      case 7:
        return 'scroll-auto'
      default:
        return listGuideItems && listGuideItems - 1 === i
          ? 'scroll-auto'
          : 'scroll-auto border-b border-brand-grey-whisper'
    }
  }

  const getIconCheckboxGridContainer = () => {
    const classNames = ['grid', 'gap-x-4', 'w-full', 'm-auto']
    if (listGuideItems === undefined || listGuideItems > 3) {
      classNames.push('md:w-4/6', 'md:grid-rows-4', 'md:grid-cols-2', 'md:grid-flow-col')
    } else {
      classNames.push('md:w-3/6', 'md:grid-cols-1')
    }
    return classNames.join(' ')
  }

  return (
    <div className="flex-grow flex flex-col items-center bg-white md:justify-center">
      <div className="p-6 md:w-5/6">
        <Typography
          as="h1"
          type={TypographyType.Heading}
          size={TypographySize.Tiny}
          className="flex md:text-2xl md:leading-8 xl:text-3xl xl:leading-10"
        >
          {t(`pages.tasteFinder.steps.${screenKey}.text`)}
        </Typography>
        <Guide
          screenKey={screenKey}
          images={guideImages}
          icons={guideIcons}
          guideType={guideType}
          listGuideItems={listGuideItems}
          className="mt-4"
        />
      </div>
      <div className="flex md:flex-none flex-col flex-grow w-full justify-center align-center overflow-x-auto pb-6 md:pb-0">
        {scrollableImages ? (
          <div className="relative flex w-full overflow-x-auto gap-x-10 snap-x xl:justify-center">
            <div className="w-1/12 pr-12 -mx-2.5 h-80 relative shrink-0 snap-start scroll-auto" />
            {screenData.map((item, idx) => {
              if (imageType === 'image') {
                return (
                  <ImageCheckbox
                    key={`imagecheckbox-${idx}`}
                    name={item.name}
                    imageSrc={(item as TastePartialScreenDataImageItem).image}
                    text={item.text}
                    selectedText={'selectedText' in item ? item.selectedText : undefined}
                    selected={getCurrentFieldData() === item.name}
                    toggleSelected={(selected: boolean) => handleDataChange(selected, item.name)}
                    className={'shrink-0 snap-center scroll-auto'}
                  />
                )
              }
            })}
            <div className="w-1/12 pl-12 -mx-2.5 h-80 relative shrink-0 snap-start scroll-auto" />
          </div>
        ) : (
          <div className={getIconCheckboxGridContainer()}>
            {screenData.map((item, idx) => {
              if (imageType === 'icon') {
                return (
                  <div key={`iconcheckboxcontainer-${idx}`} className={getIconCheckboxContainerClass(idx)}>
                    <IconCheckbox
                      name={item.name}
                      iconName={'iconName' in item ? item.iconName : null}
                      itemSize={itemSize}
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
    </div>
  )
}
