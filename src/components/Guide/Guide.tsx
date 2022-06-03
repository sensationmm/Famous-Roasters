import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, Drawer, Icon, IconName, IconSize, Typography, TypographySize, TypographyType } from 'src/components'

interface GuideEntry {
  key: string
  image?: string
}

export enum GuideType {
  List = 'list',
  Text = 'text',
}

interface GuideInfoProps extends React.HTMLAttributes<HTMLElement> {
  screenKey: string
  images?: (string | undefined)[]
  guideType?: GuideType
  className?: string
}

export const Guide: React.FC<GuideInfoProps> = ({
  screenKey,
  images,
  guideType = GuideType.List,
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

  const infoData: GuideEntry[] = [
    {
      key: 'soft',
      image: images && images[0],
    },
    {
      key: 'medium',
      image: images && images[1],
    },
    {
      key: 'intense',
      image: images && images[2],
    },
  ]

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
        {guideType === GuideType.List ? (
          infoData.map((item, idx) => {
            const containerClassName =
              idx === infoData.length - 1
                ? 'flex items-start justify-between p-5'
                : 'flex items-start justify-between p-5 border-b border-coreUI-background-images'
            return (
              <div key={`grinds-info-item-${item.key}`} className={containerClassName}>
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-clip">
                  <div className="w-20 h-20 top-0 absolute rounded-full bg-brand-grey-whisper" />
                  <img src={item.image} alt={`image-${item.key}`} className="absolute" />
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
        ) : (
          <Typography
            as="h4"
            type={TypographyType.Paragraph}
            size={TypographySize.Large}
            className="text-coreUI-text-secondary font-semibold p-5 pt-0"
          >
            {t(`guides.${screenKey}.textBold`)}
          </Typography>
        )}
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
