import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  BeanScaleTag,
  Dialog,
  Drawer,
  Icon,
  IconName,
  IconSize,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

export interface TasteInfoEntry {
  key: string
  value: number
}

interface GuideEntry {
  key: string
  image?: string
  icon?: string
  tasteParam?: TasteInfoEntry
}

export enum GuideType {
  List = 'list',
  Text = 'text',
  TasteResults = 'tasteResults',
}

interface GuideInfoProps extends React.HTMLAttributes<HTMLElement> {
  screenKey: string
  images?: (string | undefined)[]
  icons?: (string | undefined)[]
  tasteResults?: (TasteInfoEntry | undefined)[]
  guideType?: GuideType
  listGuideItems?: number
  className?: string
}

export const Guide: React.FC<GuideInfoProps> = ({
  screenKey,
  images,
  icons,
  tasteResults,
  guideType = GuideType.List,
  listGuideItems = 3,
  className,
}: GuideInfoProps) => {
  const { t } = useTranslation()

  const Trigger = () => (
    <div className={`flex ${className}`}>
      <Icon name={IconName.Question} size={IconSize.pb} className="mr-2.5" />
      <Typography
        as="span"
        type={TypographyType.Paragraph}
        size={TypographySize.Small}
        className="flex border-b-2 mb-1"
        style={{ borderBottomWidth: 1 }}
      >
        {t(`guides.${screenKey}.trigger`)}
      </Typography>
    </div>
  )

  const headline = t(`guides.${screenKey}.title`)
  const overline = t(`guides.${screenKey}.overline`)

  const infoData: GuideEntry[] = []

  Array.from(Array(listGuideItems).keys()).forEach((index) => {
    infoData.push({
      key: index.toString(),
      image: images && images[index],
      icon: icons && icons[index],
      tasteParam: tasteResults && tasteResults[index],
    })
  })

  const getListItemContainerClassName = (idx: number, lastIdx: number) => {
    if (idx === lastIdx) {
      return 'flex items-start justify-between p-5'
    } else {
      return 'flex items-start justify-between p-5 border-b border-coreUI-background-images'
    }
  }

  const getTasteParamRange = (param: TasteInfoEntry | undefined) => {
    const value = param?.value || 0
    if (value <= 3) {
      return 'lo'
    } else {
      if (value > 7) {
        return 'hi'
      } else {
        return 'mid'
      }
    }
  }

  const renderGuideMainContent = () => {
    switch (guideType) {
      case GuideType.List:
        return infoData.map((item, idx) => {
          return (
            <div
              key={`list-guide-item-${item.key}`}
              className={getListItemContainerClassName(idx, infoData.length - 1)}
            >
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-clip shrink-0">
                <div className="w-20 h-20 top-0 absolute rounded-full bg-brand-grey-whisper" />
                {item.image && <img src={item.image} alt={`image-${item.key}`} className="absolute" />}
                {item.icon && <Icon name={item.icon} size={IconSize.lg} className="absolute" />}
              </div>
              <div className="flex flex-1 pl-4 flex-col">
                <Typography type={TypographyType.Label} size={TypographySize.Large}>
                  {t(`guides.${screenKey}.items.${item.key}.title`)}
                </Typography>
                <Typography
                  type={TypographyType.Paragraph}
                  size={TypographySize.Base}
                  className="text-coreUI-text-secondary mt-1"
                >
                  {t(`guides.${screenKey}.items.${item.key}.text`)}
                </Typography>
              </div>
            </div>
          )
        })
      case GuideType.TasteResults:
        return infoData.map((item, idx) => {
          return (
            <div
              key={`results-guide-item-${item.key}`}
              className={getListItemContainerClassName(idx, infoData.length - 1)}
            >
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-clip shrink-0">
                <div className="w-20 h-20 top-0 absolute rounded-full bg-brand-grey-whisper" />
                {item.image && <img src={item.image} alt={`image-${item.key}`} className="absolute" />}
              </div>
              <div className="flex flex-1 pl-4 flex-col">
                <div className="flex flex-row justify-between">
                  <Typography type={TypographyType.Label} size={TypographySize.Large}>
                    {t(`guides.${screenKey}.items.${item.tasteParam?.key}.title`)}
                  </Typography>
                  {item.tasteParam?.value && <BeanScaleTag value={item.tasteParam?.value} />}
                </div>
                <Typography
                  type={TypographyType.Paragraph}
                  size={TypographySize.Base}
                  className="text-coreUI-text-secondary mt-1"
                >
                  {t(`guides.${screenKey}.items.${item.tasteParam?.key}.text.${getTasteParamRange(item.tasteParam)}`)}
                </Typography>
              </div>
            </div>
          )
        })
      default:
        return (
          <Typography
            as="h4"
            type={TypographyType.Paragraph}
            size={TypographySize.Large}
            className="text-coreUI-text-secondary font-semibold p-5 pt-0"
          >
            {t(`guides.${screenKey}.textBold`)}
          </Typography>
        )
    }
  }

  const renderMainContent = () => {
    return (
      <>
        <Typography
          as="h4"
          type={TypographyType.Paragraph}
          size={TypographySize.Large}
          className="text-coreUI-text-secondary p-5 pt-0"
        >
          {t(`guides.${screenKey}.text`)}
        </Typography>
        {renderGuideMainContent()}
      </>
    )
  }

  const renderMainContentDrawer = () => {
    return (
      <>
        <Typography as="h3" type={TypographyType.Heading} size={TypographySize.Tiny} className="p-5">
          {headline}
        </Typography>
        {renderMainContent()}
      </>
    )
  }

  return (
    <>
      <Drawer
        trigger={
          <button>
            <Trigger />
          </button>
        }
        title={overline}
        body={renderMainContentDrawer()}
        className="flex md:hidden"
      />
      <Dialog
        trigger={
          <button>
            <Trigger />
          </button>
        }
        title={headline}
        overline={overline}
        body={renderMainContent()}
        className="hidden md:flex"
      />
    </>
  )
}
