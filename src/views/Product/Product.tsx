import { useQuery } from '@apollo/client'
import { Product as ProductType } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import {
  Carousel,
  Disclosure,
  ErrorPrompt,
  Layout,
  Loader,
  Tag,
  TagType,
  TasteProfile,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

import { getAPIProductId } from '../../utils'

interface ProductMeta {
  value: string
}

interface ProductMetaInteger {
  value: number
}

interface ProductCustom {
  bean_type: ProductMeta
  aroma: ProductMeta
  sweetness: ProductMetaInteger
  body: ProductMetaInteger
  bitterness: ProductMetaInteger
  acidity: ProductMetaInteger
}

interface ProductQuery {
  product: ProductType & ProductCustom
}

export const Product: React.FC = () => {
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

  const { title, vendor, bean_type, aroma, sweetness, body, bitterness, acidity, images } = data?.product || {}

  if (loading) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (error || !images || images.nodes.length < 1) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  const renderProductMainBlock = () => {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Images */}
        <Carousel images={images.nodes} />
        <div>
          {/* Vendor and bean_type */}
          <div>
            <Typography
              as="h2"
              type={TypographyType.Paragraph}
              size={TypographySize.Small}
              className="text-coreUI-text-secondary"
            >
              {bean_type ? `${vendor} | ${bean_type.value}` : vendor}
            </Typography>
          </div>
          {/* Title */}
          <div className="border-b border-brand-grey-whisper pb-4">
            <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Small}>
              {title}
            </Typography>
          </div>
          {/* Aroma tag */}
          {aroma && (
            <div className="mt-4">
              <Tag type={TagType.Aroma} value={aroma.value} />
            </div>
          )}
          {/* Taste profile */}
          {sweetness && body && bitterness && acidity && (
            <div className="mt-4">
              <TasteProfile
                sweetness={sweetness.value}
                body={body.value}
                bitterness={bitterness.value}
                acidity={acidity.value}
              />
            </div>
          )}
          {/* Buy section */}
          <div className="mt-4 border border-dashed border-brand-grey-bombay">
            <em>Buy section placeholder</em>
          </div>
        </div>
      </div>
    )
  }

  const renderProductCollapsableBlocks = () => {
    const placeHolderText = (
      <>
        <Typography as="p" className="mb-2">
          Cup, crema doppio fair trade sweet cinnamon galão acerbic beans irish. Breve, id qui, bar et, eu, viennese as
          body filter aftertaste cappuccino.
        </Typography>
        <Typography as="p" className="mb-2">
          Irish cup frappuccino saucer dark white body arabica. Plunger pot ristretto trifecta single origin, acerbic
          barista milk qui et aroma americano.
        </Typography>
        <Typography as="p" className="mb-2">
          Trifecta cortado grinder variety aroma at mazagran, saucer carajillo french press rich extra. As, flavour,
          foam, extra , frappuccino espresso trifecta macchiato robust flavour a ristretto.
        </Typography>
      </>
    )

    const blocksData = [{ key: 'getToKnow' }, { key: 'meetTheRoaster' }, { key: 'learnToBrew' }, { key: 'findSimilar' }]

    return (
      <div className="mt-6">
        {blocksData.map((blockData, idx) => (
          <Disclosure
            key={`pdp-disclosure-${idx}`}
            className="border-t border-coreUI-border"
            buttonChildren={
              <Typography type={TypographyType.Heading} size={TypographySize.Tiny}>
                {t(`pages.product.sections.${blockData.key}.title`)}
              </Typography>
            }
            panelChildren={placeHolderText}
          />
        ))}
      </div>
    )
  }

  return (
    <Layout>
      <main className="flex flex-grow w-full items-start justify-center bg-white mt-4 mb-4">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
          {renderProductMainBlock()}
          {renderProductCollapsableBlocks()}
        </div>
      </main>
    </Layout>
  )
}
