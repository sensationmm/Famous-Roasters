import React from 'react'
import { useTranslation } from 'react-i18next'
import aeropress from 'src/assets/images/grindsInfo/aeropress.png'
import chemex from 'src/assets/images/grindsInfo/chemex.png'
import espresso from 'src/assets/images/grindsInfo/espresso.png'
import french from 'src/assets/images/grindsInfo/french.png'
import moka from 'src/assets/images/grindsInfo/moka.png'
import v60 from 'src/assets/images/grindsInfo/v60.png'
import whole from 'src/assets/images/grindsInfo/whole.png'
import { Dialog, Drawer, Icon, IconName, IconSize, Typography, TypographySize, TypographyType } from 'src/components'

interface GrindsInfoEntry {
  key: string
  iconName: IconName
  image: string
}

export const GrindsInfo: React.FC = () => {
  const { t } = useTranslation()

  const Trigger = () => (
    <Typography
      as="span"
      type={TypographyType.Paragraph}
      size={TypographySize.Small}
      className="flex text-coreUI-text-secondary underline mb-1"
    >
      {t('pages.product.transactional.options.grindType.moreInfo')}
    </Typography>
  )

  const headline = t(`pages.product.transactional.options.grindType.guide.title`)

  const infoData: GrindsInfoEntry[] = [
    {
      key: 'whole',
      iconName: IconName.WholeBean,
      image: whole,
    },
    {
      key: 'aeropress',
      iconName: IconName.Aeropress,
      image: aeropress,
    },
    {
      key: 'moka',
      iconName: IconName.Moka,
      image: moka,
    },
    {
      key: 'espresso',
      iconName: IconName.Espresso,
      image: espresso,
    },
    {
      key: 'v60',
      iconName: IconName.V60,
      image: v60,
    },
    {
      key: 'chemex',
      iconName: IconName.Chemex,
      image: chemex,
    },
    {
      key: 'french',
      iconName: IconName.FrenchPress,
      image: french,
    },
  ]

  const renderMainContent = () => {
    return infoData.map((item, idx) => {
      const className =
        idx === infoData.length - 1
          ? 'flex items-start justify-between p-5'
          : 'flex items-start justify-between p-5 border-b border-coreUI-background-images'
      return (
        <div key={`grinds-info-item-${item.key}`} className={className}>
          <div className="w-12 h-12 rounded-full bg-brand-grey-whisper flex items-center justify-center">
            <Icon name={item.iconName} size={IconSize.md} />
          </div>
          <div className="flex flex-1 px-4 flex-col">
            <Typography type={TypographyType.Label} size={TypographySize.Small}>
              {t(`pages.product.transactional.options.grindType.guide.items.${item.key}.title`)}
            </Typography>
            <Typography
              type={TypographyType.Paragraph}
              size={TypographySize.Tiny}
              className="text-coreUI-text-secondary mt-1"
            >
              {t(`pages.product.transactional.options.grindType.guide.items.${item.key}.text`)}
            </Typography>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-clip">
            <img src={item.image} alt={`image-${item.key}`} />
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <Drawer
        trigger={
          <button>
            <Trigger />
          </button>
        }
        title={headline}
        body={renderMainContent()}
        className="flex md:hidden"
      />
      <Dialog
        trigger={
          <button>
            <Trigger />
          </button>
        }
        title={headline}
        body={renderMainContent()}
        className="hidden md:flex"
      />
    </>
  )
}
