import { useQuery } from '@apollo/client/react/hooks'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  CoffeeAroma,
  ErrorPrompt,
  Layout,
  Loader,
  MyAroma,
  ProductTile,
  Tag,
  TagType,
  TasteProfileProps,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { getAPIId, toRoundedValueInRealScale, useLocalStorage } from 'src/utils'

import { TasteFinderField } from '../TasteFinder'
import { ProductQuery } from '.'

interface TasteProfileResult extends TasteProfileProps {
  grindType: string
  adventurous: string
}

export const FeaturedProduct: React.FC = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const GET_PRODUCT = loader('src/graphql/queries/product.query.graphql')
  const [tasteFinderDataJSON, setTasteFinderLocalStorage] = useLocalStorage('tasteFinder', '')
  const tasteFinderData = tasteFinderDataJSON && JSON.parse(tasteFinderDataJSON)

  const { loading, error, data } = useQuery<ProductQuery>(GET_PRODUCT, {
    variables: {
      id: getAPIId(id || ''),
    },
  })

  const { aroma, images, title, whyThisCoffee } = data?.product || {}

  const getMatchScore = () => {
    const recommendations =
      tasteFinderDataJSON && tasteFinderData.find((el: TasteFinderField) => el.name === 'recommendations')?.value
    const score =
      tasteFinderDataJSON && recommendations && recommendations[0]?.score
        ? Math.round(recommendations[0]?.score * 100)
        : 0

    if (score === 0) return null

    return (
      <div className="mt-4">
        <Tag type={TagType.TasteFinder} value={`${score}% Übereinstimmung`} />
      </div>
    )
  }

  useEffect(() => {
    if (tasteFinderDataJSON !== '' && aroma?.value) {
      if (tasteFinderData.findIndex((p: TasteFinderField) => p.name === 'aroma') !== -1) {
        tasteFinderData.forEach((key: TasteFinderField, count: number) => {
          if (key.name === 'aroma') {
            tasteFinderData.splice(count, 1)
          }
        })
      }
      const saveAroma = [...tasteFinderData, { name: 'aroma', value: aroma?.value }]
      setTasteFinderLocalStorage(JSON.stringify(saveAroma))
    }
  }, [aroma])

  const tasteProfileResults: TasteProfileResult = {
    acidity: tasteFinderDataJSON
      ? toRoundedValueInRealScale(parseInt(tasteFinderData.find((el: TasteFinderField) => el.name === 'acidity').value))
      : 0,
    bitterness: tasteFinderDataJSON
      ? toRoundedValueInRealScale(
          parseInt(tasteFinderData.find((el: TasteFinderField) => el.name === 'bitterness').value),
        )
      : 0,
    sweetness: tasteFinderDataJSON
      ? toRoundedValueInRealScale(
          parseInt(tasteFinderData.find((el: TasteFinderField) => el.name === 'sweetness').value),
        )
      : 0,
    body: tasteFinderDataJSON
      ? toRoundedValueInRealScale(parseInt(tasteFinderData.find((el: TasteFinderField) => el.name === 'body').value))
      : 0,
    grindType: tasteFinderDataJSON ? tasteFinderData.find((el: TasteFinderField) => el.name === 'grindType').value : '',
    adventurous: tasteFinderDataJSON
      ? tasteFinderData.find((el: TasteFinderField) => el.name === 'adventurous').value
      : '',
  }

  if (loading) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (error || !data?.product) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  if (loading) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  const name =
    tasteFinderData && tasteFinderData?.find((el: TasteFinderField) => el.name === 'name')
      ? tasteFinderData.find((el: TasteFinderField) => el.name === 'name').value
      : undefined

  const renderRecommendationBlock = () => {
    const parseWhyThisCoffee = (value: string) => {
      const lines = value
        .split('.')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

      return (
        <div>
          <Typography
            as="h3"
            type={TypographyType.Heading}
            size={TypographySize.Tiny}
            className="border-b border-brand-grey-whisper mt-8"
          >
            {t('pages.featuredProduct.recommendation.facts')}
          </Typography>
          <ul>
            {lines.map((line, idx) => (
              <li key={`whythiscoffee-${idx}`} className="flex mt-4">
                <CheckCircleIcon className="flex w-6 h-6 mr-2 text-coreUI-text-tertiary flex-shrink-0" />
                <Typography className="flex text-coreUI-text-secondary">{line}</Typography>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div>
        <Typography
          as="h2"
          type={TypographyType.Heading}
          size={TypographySize.Tiny}
          className="md:text-2xl xl:text-3xl"
        >
          {t('pages.featuredProduct.recommendation.title')}
        </Typography>
        <div className="grid grid-cols-2 gap-0 mt-8 md:gap-4">
          <Link to={`/product/${id}`} className="flex justify-center items-start md:row-start-1 md:row-end-3">
            <div className="flex aspect-1 justify-center items-center rounded-full bg-coreUI-background-images w-3/4 shrink-0 grow-0">
              <img src={images?.nodes[0].url} alt={title} className="w-full w-3/4 h-auto shrink-0 grow-0" />
            </div>
          </Link>
          {data?.product && (
            <Link to={`/product/${id}`} className="flex flex-col w-fit">
              <ProductTile
                productNode={data?.product}
                featured={true}
                showImage={false}
                showFrom={true}
                className="p-0"
              />
              {getMatchScore()}
            </Link>
          )}
          <div className="col-span-2 md:col-start-2 md:col-span-1">
            {whyThisCoffee && parseWhyThisCoffee(whyThisCoffee.value)}
          </div>
          <div className="mt-8 col-span-2 md:col-start-2 md:col-span-1">
            <Link to={`/product/${id}`}>
              <Button
                type="button"
                emphasis={ButtonEmphasis.Primary}
                size={ButtonSize.md}
                className="flex w-full justify-center"
                data-testid="goToProduct"
              >
                {t('pages.featuredProduct.cta.goToProduct')}
              </Button>
            </Link>
          </div>
          <div className="mt-4 col-span-2 md:mt-0 md:col-start-2 md:col-span-1">
            <Link
              to={encodeURI(
                `/catalogue?products[refinementList][meta.my_fields.aroma][0]=${aroma?.value || ''}`,
              ).replace('&', '%26')}
            >
              <Button
                type="button"
                emphasis={ButtonEmphasis.Secondary}
                size={ButtonSize.md}
                className="flex w-full justify-center"
                data-testid="discoverMore"
              >
                {t('pages.featuredProduct.cta.discoverMore')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>
          {t('brand.name')} | {t('pages.profile.links.tasteProfile')}
        </title>
        <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_SHOP}/featured/${id}`} />
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="flex flex-col w-full bg-white mt-8 mb-8">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
          {aroma && (
            <MyAroma
              aroma={aroma.value as CoffeeAroma}
              tasteProfileResults={tasteProfileResults}
              showInfo
              showGuide
              name={name}
            />
          )}
        </div>
        <div className="border-t border-brand-grey-whisper mt-8" />
        <div className="w-full max-w-7xl mx-auto mt-8 px-6 xl:px-8">{renderRecommendationBlock()}</div>
      </main>
    </Layout>
  )
}
