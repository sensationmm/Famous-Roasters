import { useQuery } from '@apollo/client/react/hooks'
import { CheckCircleIcon } from '@heroicons/react/outline'
import {
  Product as ProductType,
  ProductVariant,
  ProductVariantConnection,
} from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import Chocolate from 'src/assets/images/coffeeProfile/Chocolate.webp'
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
  ErrorPrompt,
  Guide,
  GuideType,
  Layout,
  Loader,
  ProductTile,
  Tag,
  TagType,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { getAPIProductId, getAromaKey } from 'src/utils'

import { getGuideImages, getTasteResults, TasteProfile } from '.'

interface ProductMeta {
  value: string
}

interface ProductMetaInteger {
  value: number
}

interface ProductVariantCustom extends ProductVariant {
  grind_type: ProductMeta
  package_size: ProductMeta
}

interface ProductVariantConnectionCustom extends ProductVariantConnection {
  nodes: Array<ProductVariantCustom>
}

interface ProductCustom extends ProductType {
  coffee_type: ProductMeta
  bean_type: ProductMeta
  aroma: ProductMeta
  flavourNotes: ProductMeta
  origin: ProductMeta
  producer: ProductMeta
  altitude: ProductMeta
  variety: ProductMeta
  processing: ProductMeta
  whyThisCoffee: ProductMeta
  sweetness: ProductMetaInteger
  body: ProductMetaInteger
  bitterness: ProductMetaInteger
  acidity: ProductMetaInteger
  pricePerKg: ProductMeta
  variants: ProductVariantConnectionCustom
}

interface ProductQuery {
  product: ProductCustom
}

export const FeaturedProduct: React.FC = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const GET_PRODUCT = loader('src/graphql/queries/product.query.graphql')

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.product.title')}`
  }, [])

  if (!id) return null

  const { loading, error, data } = useQuery<ProductQuery>(GET_PRODUCT, {
    variables: {
      id: getAPIProductId(id),
    },
  })

  const { aroma, images, title, whyThisCoffee } = data?.product || {}

  // TODO - this is hardcoded for now, as next: grab the stored taste profile data
  const tasteProfileResults: TasteProfile = {
    acidity: 1,
    bitterness: 5,
    sweetness: 8,
    body: 5,
  }

  if (error) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  if (loading || !images) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  const renderYourCoffeeTypeBlock = (aromaValue: string) => {
    const aromaKey = getAromaKey(aromaValue)

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
        default:
          return Experimental
      }
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 items-end">
        <div className="relative w-52 h-40 mx-auto md:order-2 md:w-64 md:h-52 xl:w-80 xl:h-64">
          <div className="w-40 h-40 top-0 left-6 absolute rounded-full bg-brand-grey-whisper md:w-52 md:h-52 xl:w-64 xl:h-64" />
          <img src={getArtworkSrc()} alt={aromaValue} className="absolute w-52 top-5 md:w-64 xl:w-80" />
        </div>
        <div className="md:order-1">
          <div className="flex items-center justify-center md:flex-col md:justify-start md:items-start">
            <Circle type={CircleType.Aroma} value={aromaValue} className="flex-shrink-0 mr-2 md:mr-0" />
            <Typography
              as="h1"
              type={TypographyType.Heading}
              size={TypographySize.Small}
              className="font-syne md:mt-2 md:text-3xl md:leading-10 xl:text-4xl xl:leading-10"
            >
              {aromaValue}
            </Typography>
          </div>
          <div className="flex items-center justify-center mt-2 md:justify-start">
            <Typography className="text-coreUI-text-secondary">
              {t('pages.featuredProduct.yourCoffeeType.title')}
            </Typography>
          </div>
          <div className="flex items-center justify-center mt-2 md:justify-start">
            <Typography className="text-center md:text-left">
              {t(`pages.featuredProduct.items.${aromaKey}.description`)}
            </Typography>
          </div>
          <Guide
            screenKey="tasteResults"
            listGuideItems={4}
            guideType={GuideType.TasteResults}
            images={getGuideImages(tasteProfileResults)}
            tasteResults={getTasteResults(tasteProfileResults)}
            className="mt-6"
          />
        </div>
      </div>
    )
  }

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
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-8">
          <Link to={`/product/${id}`} className="flex justify-center items-start">
            <div className="flex aspect-1 justify-center items-center rounded-full bg-coreUI-background-images w-full w-3/4 h-fit shrink-0 grow-0">
              <img src={images.nodes[0].url} alt={title} className="w-full w-3/4 h-fit shrink-0 grow-0" />
            </div>
          </Link>
          <div>
            {data?.product && (
              <div>
                <Link to={`/product/${id}`} className="flex flex-col w-fit">
                  <ProductTile
                    productNode={data?.product}
                    featured={true}
                    showImage={false}
                    showFrom={true}
                    className="p-0"
                  />
                  <div>
                    <Tag type={TagType.TasteFinder} value="98% Übereinstimmung" />
                  </div>
                </Link>
              </div>
            )}
            {whyThisCoffee && parseWhyThisCoffee(whyThisCoffee.value)}
            <div className="mt-8">
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
            <div className="mt-4">
              <Link to="/catalogue">
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
      </div>
    )
  }

  return (
    <Layout>
      <main className="flex flex-col w-full bg-white mt-8 mb-8">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">{aroma && renderYourCoffeeTypeBlock(aroma.value)}</div>
        <div className="border-t border-brand-grey-whisper mt-8" />
        <div className="w-full max-w-7xl mx-auto mt-8 px-6 xl:px-8">{renderRecommendationBlock()}</div>
      </main>
    </Layout>
  )
}
