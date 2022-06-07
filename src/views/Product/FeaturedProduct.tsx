import { useQuery } from '@apollo/client/react/hooks'
import {
  Product as ProductType,
  ProductVariant,
  ProductVariantConnection,
} from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Artwork from 'src/assets/images/artwork/01.svg'
import {
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
import { getAPIProductId } from 'src/utils'

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

  const { aroma, images, title } = data?.product || {}

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

  const renderYourCoffeeTypeBlock = (aroma: string) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 items-end">
        <div className="relative w-52 h-40 mx-auto md:order-2 md:w-64 md:h-52 xl:w-80 xl:h-64">
          <div className="w-40 h-40 top-0 left-6 absolute rounded-full bg-brand-grey-whisper md:w-52 md:h-52 xl:w-64 xl:h-64" />
          <img src={Artwork} alt={aroma} className="absolute w-52 top-5 md:w-64 xl:w-80" />
        </div>
        <div className="md:order-1">
          <div className="flex items-center justify-center md:flex-col md:justify-start md:items-start">
            <Circle type={CircleType.Aroma} value={aroma} className="flex-shrink-0 mr-2 md:mr-0" />
            <Typography
              as="h1"
              type={TypographyType.Heading}
              size={TypographySize.Small}
              className="font-syne md:mt-2 md:text-3xl md:leading-10 xl:text-4xl xl:leading-10"
            >
              {aroma}
            </Typography>
          </div>
          <div className="flex items-center justify-center mt-2 md:justify-start">
            <Typography className="text-coreUI-text-secondary">
              {t('pages.featuredProduct.yourCoffeeType.title')}
            </Typography>
          </div>
          <div className="flex items-center justify-center mt-2 md:justify-start">
            <Typography>{t('pages.featuredProduct.items.nutsChocolate.headline')}</Typography>
          </div>
          <Guide screenKey="brewing" guideType={GuideType.Text} className="mt-6" />
        </div>
      </div>
    )
  }

  const renderRecommendationBlock = () => {
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
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="flex aspect-1 justify-center items-center">
            <img src={images.nodes[0].url} alt={title} className="w-full w-3/4 h-fit shrink-0 grow-0" />
          </div>
          <div>
            {data?.product && (
              <ProductTile productNode={data?.product} showImage={false} showFrom={true} className="p-0" />
            )}
            <div>
              <Tag type={TagType.TasteFinder} value="98% Übereinstimmung" />
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
