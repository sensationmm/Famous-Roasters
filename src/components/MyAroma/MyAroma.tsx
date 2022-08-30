import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Chocolate from 'src/assets/images/coffeeProfile/Chocolate.webp'
import Empty from 'src/assets/images/coffeeProfile/Empty.webp'
import Experimental from 'src/assets/images/coffeeProfile/Experimental.webp'
import Floral from 'src/assets/images/coffeeProfile/Floral.webp'
import Fruits from 'src/assets/images/coffeeProfile/Fruits.webp'
import Spicy from 'src/assets/images/coffeeProfile/Spicy.webp'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  Circle,
  CircleType,
  Guide,
  GuideType,
  TasteProfileProps,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { getAromaKey } from 'src/utils'
import { getGuideImages, getTasteResults } from 'src/views/Product'

import { TypographyProps } from '../Typography/Typography'

export type CoffeeAroma =
  | 'Floral & leicht'
  | 'Fruchtig & lebhaft'
  | 'Nussig & schokoladig'
  | 'Würzig & kräftig'
  | 'Experimentell & komplex'
  | ''

interface MyAromaProps extends React.HTMLAttributes<HTMLElement> {
  aroma: CoffeeAroma
  tasteProfileResults?: TasteProfileProps
  showInfo?: boolean
  isProfile?: boolean
  showGuide?: boolean
  name?: string
  headingAs?: TypographyProps['as']
}

export const MyAroma: React.FC<MyAromaProps> = ({
  aroma,
  tasteProfileResults,
  showInfo = false,
  showGuide = false,
  isProfile = false,
  name,
  headingAs = 'h1',
}: MyAromaProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const aromaKey = getAromaKey(aroma)

  const getArtworkSrc = () => {
    switch (aromaKey) {
      case 'floral':
        return Floral
      case 'fruits':
        return Fruits
      case 'chocolate':
        return Chocolate
      case 'spicy':
        return Spicy
      case 'experimental':
        return Experimental
      default:
        return Empty
    }
  }

  const MyName = name || t('pages.featuredProduct.yourCoffeeType.namePlaceholder')

  const artworkWidth = isProfile ? 'w-52' : 'w-52 md:w-64 xl:w-80'
  const artworkDimensions = isProfile ? 'w-32 h-32' : 'w-40 h-40 md:w-52 md:h-52 xl:w-64 xl:h-64'
  const containerDimensions = isProfile ? 'w-80 h-44' : 'w-52 h-40 md:w-64 md:h-52 xl:w-80 xl:h-64'

  return (
    <div className={`grid grid-cols-1 ${!isProfile ? 'md:grid-cols-2' : ''} items-end`}>
      <div className={`relative flex justify-center mx-auto ${!isProfile ? 'md:order-2' : ''} ${containerDimensions}`}>
        <div className={`top-0 left-auto absolute rounded-full bg-brand-grey-whisper ${artworkDimensions}`} />
        <img src={getArtworkSrc()} alt={aroma} className={`absolute top-5 ${artworkWidth}`} />
      </div>
      <div className={!isProfile ? `md:order-1` : ''}>
        {!aroma || aroma.length == 0 ? (
          <Button
            className="w-full justify-center"
            data-testid="button-empty-tasteprofile-cta"
            emphasis={ButtonEmphasis.Secondary}
            size={ButtonSize.sm}
            onClick={() => navigate('/taste-finder?step=willkommen')}
            center
          >
            {t('pages.profile.tasteFinderCTA')}
          </Button>
        ) : (
          <div className={`flex ${isProfile ? 'flex-col-reverse' : 'flex-col'}`}>
            <div
              className={`flex items-center justify-center ${
                !isProfile ? 'md:flex-col md:justify-start md:items-start' : ''
              }`}
            >
              <Circle
                type={!isProfile ? CircleType.Aroma : CircleType.AromaSmall}
                value={aroma}
                className={`flex-shrink-0 mr-2 ${!isProfile ? 'md:mr-0' : ''}`}
              />
              <Typography
                as={headingAs}
                type={!isProfile ? TypographyType.Heading : TypographyType.Label}
                size={!isProfile ? TypographySize.Small : TypographySize.Large}
                className={`font-syne ${
                  !isProfile ? 'md:mt-2 md:text-3xl xl:text-4xl md:leading-10 xl:leading-10' : ''
                } `}
              >
                {aroma}
              </Typography>
            </div>
            <div className={`flex items-center justify-center mt-2 ${!isProfile ? 'md:justify-start' : ''}`}>
              <Typography
                className="text-coreUI-text-secondary"
                size={!isProfile ? TypographySize.Base : TypographySize.Small}
              >
                {isProfile
                  ? t('pages.featuredProduct.yourCoffeeType.profileTitle')
                  : t('pages.featuredProduct.yourCoffeeType.title', { name: MyName })}
              </Typography>
            </div>
          </div>
        )}
        {showInfo && (
          <div className="flex items-center justify-center mt-2 md:justify-start">
            <Typography className="text-center md:text-left">
              {t(`pages.featuredProduct.items.${aromaKey}.description`)}
            </Typography>
          </div>
        )}
        {showGuide && tasteProfileResults && (
          <Guide
            screenKey="tasteResults"
            listGuideItems={4}
            guideType={GuideType.TasteResults}
            images={getGuideImages(tasteProfileResults)}
            tasteResults={getTasteResults(tasteProfileResults)}
            className="mt-6"
          />
        )}
      </div>
    </div>
  )
}
