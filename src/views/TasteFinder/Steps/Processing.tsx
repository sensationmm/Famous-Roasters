import { useLazyQuery } from '@apollo/client/react/hooks'
import { loader } from 'graphql.macro'
import Lottie from 'lottie-react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import aeropressAni from 'src/assets/images/lottieAnimations/aeropress.json'
import { Typography, TypographySize, TypographyType } from 'src/components'
import { toRoundedValueInRealScale } from 'src/utils'
import { TasteFinderField, TasteFinderFieldHandlerProps } from 'src/views/TasteFinder'
const GET_TASTE_FINDER_RECOMMENDATION = loader('src/graphql/queries/tasteFinderRecommendation.query.graphql')

interface TasteFinderProfile {
  sweetness: number
  body: number
  bitterness: number
  acidity: number
  coffeeType: string
}

export const Processing: React.FC<TasteFinderFieldHandlerProps> = ({
  currentData,
  updateData,
}: TasteFinderFieldHandlerProps) => {
  const { t } = useTranslation()

  const propsToProfile = (d: TasteFinderField[]): Partial<TasteFinderProfile> => {
    const parseParam = (n: string, v: string | undefined) => {
      switch (n) {
        case 'sweetness':
        case 'body':
        case 'bitterness':
        case 'acidity':
          return toRoundedValueInRealScale(parseInt(v as string))
        case 'grindType':
          return v === 'Espresso' || v === 'Moka' ? 'ESPRESSO' : 'FILTER'
        default:
          return v
      }
    }
    const res = d.reduce(
      (o, key) => ({ ...o, [key.name === 'grindType' ? 'coffeeType' : key.name]: parseParam(key.name, key.value) }),
      {},
    )
    return Object.fromEntries(
      Object.entries(res).filter(([key]) => ['sweetness', 'body', 'bitterness', 'acidity', 'coffeeType'].includes(key)),
    )
  }

  const [getTasteFinderRecommendation] = useLazyQuery(GET_TASTE_FINDER_RECOMMENDATION)

  const getRecommendation = () => {
    if (currentData) {
      getTasteFinderRecommendation({
        variables: {
          profile: propsToProfile(currentData),
        },
      })
        .then((data) => {
          updateData({ name: 'shopifyProductIds', value: data.data.tasteFinderRecommendation.shopifyProductIds })
        })
        .catch((err) => {
          throw new Error('Error getting recommendation', err)
        })
    }
  }

  useEffect(() => {
    getRecommendation()
  }, [])

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="flex flex-col items-center justify-center -mt-20">
        <Lottie animationData={aeropressAni} loop={true} className="h-72" />
        <Typography
          as="h1"
          type={TypographyType.Heading}
          size={TypographySize.Tiny}
          className="flex text-center w-3/4 md:w-2/3 md:text-2xl md:leading-8 xl:w-1/2 xl:text-3xl xl:leading-10 mt-8"
        >
          {t('pages.tasteFinder.steps.processing.loading1')}
          <br />
          {t('pages.tasteFinder.steps.processing.loading2')}
        </Typography>
      </div>
    </div>
  )
}
