import { useLazyQuery } from '@apollo/client/react/hooks'
import { Auth } from 'aws-amplify'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AeropressBase from 'src/assets/images/lottieAnimations/aeropress/base.png'
import AeropressLevel from 'src/assets/images/lottieAnimations/aeropress/level.png'
import AeropressPress from 'src/assets/images/lottieAnimations/aeropress/press.png'
import { Typography, TypographySize, TypographyType } from 'src/components'
import { useAuth } from 'src/config/cognito'
import { toRoundedValueInRealScale } from 'src/utils'
import { TasteFinderField, TasteFinderFieldHandlerProps } from 'src/views/TasteFinder'
const GET_TASTE_FINDER_RECOMMENDATION = loader('src/graphql/queries/tasteFinderRecommendation.query.graphql')
const SAVE_TASTE_PROFILE = loader('src/graphql/queries/saveTasteProfile.query.graphql')

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
  const [user] = useAuth()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        saveProfile()
      })
      .catch((err) => new Error(err))
  }, [user?.isValid])

  const getCoffeeType = (value: string) => {
    const espressoTypes = ['Espresso', 'Moka', 'VollautomatMachine']
    return espressoTypes.includes(value) ? 'ESPRESSO' : 'FILTER'
  }

  const propsToProfile = (d: TasteFinderField[]): Partial<TasteFinderProfile> => {
    const parseParam = (n: string, v: string | undefined) => {
      switch (n) {
        case 'sweetness':
        case 'body':
        case 'bitterness':
        case 'acidity':
          return toRoundedValueInRealScale(parseInt(v as string))
        case 'grindType':
          return getCoffeeType(v as string)
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
  const [saveTasteProfileData] = useLazyQuery(SAVE_TASTE_PROFILE)

  const saveProfile = () => {
    saveTasteProfileData({
      variables: {
        acidity: parseInt(currentData.find((el) => el.name === 'acidity')?.value as string),
        bitterness: parseInt(currentData.find((el) => el.name === 'bitterness')?.value as string),
        sweetness: parseInt(currentData.find((el) => el.name === 'sweetness')?.value as string),
        body: parseInt(currentData.find((el) => el.name === 'body')?.value as string),
        coffeeType: getCoffeeType(currentData.find((el) => el.name === 'grindType')?.value as string),
      },
    }).catch((err) => {
      throw new Error('Error getting recommendation', err)
    })
  }

  const getRecommendation = () => {
    getTasteFinderRecommendation({
      variables: propsToProfile(currentData),
    })
      .then((data) => {
        updateData({ name: 'recommendations', value: data.data.tasteFinderRecommendation.recommendations })
      })
      .catch((err) => {
        throw new Error('Error getting recommendation', err)
      })
  }

  useEffect(() => {
    if (currentData.length > 0) {
      getRecommendation()
    } else {
      window.location.pathname = '/taste-finder'
    }
  }, [])

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="flex flex-col items-center justify-center -mt-20">
        <div className="flex justify-center items-center">
          <div className="relative w-[90px] h-[230px]">
            <img src={AeropressBase} className="w-full absolute bottom-0" />
            <img src={AeropressPress} className="w-full absolute top-0 animate-aeropressDown" />
            <img src={AeropressLevel} className="w-full absolute bottom-0 animate-aeropressUp" />
          </div>
        </div>
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
