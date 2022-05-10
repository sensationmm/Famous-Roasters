import { useQuery } from '@apollo/client'
import {
  Product as ProductType,
  ProductVariant,
  ProductVariantConnection,
} from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  Carousel,
  Disclosure,
  ErrorPrompt,
  Layout,
  Listbox,
  Loader,
  Tag,
  TagType,
  TasteProfile,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { formatPrice, getAPIProductId } from 'src/utils'

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
  bean_type: ProductMeta
  aroma: ProductMeta
  flavourNotes: ProductMeta
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

  const {
    title,
    vendor,
    bean_type,
    aroma,
    flavourNotes,
    sweetness,
    body,
    bitterness,
    acidity,
    images,
    variants,
    priceRange,
    pricePerKg,
  } = data?.product || {}

  if (loading) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  const currencyCode = priceRange?.minVariantPrice.currencyCode || 'EUR'
  const grindTypeValues =
    Array.from(new Set(variants?.nodes.map((variant) => variant?.grind_type?.value))).map((x) => ({
      name: x,
    })) || []
  const packageSizesValues =
    Array.from(new Set(variants?.nodes.map((variant) => variant?.package_size?.value))).map((x) => ({ name: x })) || []

  const renderProductMainBlock = () => {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Images */}
        {images && images.nodes.length > 0 && <Carousel images={images.nodes} />}
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
          {/* Flavour notes section */}
          {flavourNotes && (
            <div className="mt-4">
              <Typography type={TypographyType.Paragraph} size={TypographySize.Small}>
                {flavourNotes?.value?.replace(', ', ' • ').replace(',', ' • ')}
              </Typography>
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
          <div className="mt-4 pt-4 border-t border-brand-grey-whisper">
            <div>
              <Listbox
                items={grindTypeValues}
                hasTranslatedValues={false}
                translationPrefix="pages.product.transactional.options.grindType"
                multiple={false}
                value={[grindTypeValues[0]]}
                onChange={(v) => console.log('changed', v)}
              />
            </div>
            <div className="grid gap-6 grid-cols-2 mt-4">
              <Listbox
                items={packageSizesValues}
                hasTranslatedValues={false}
                translationPrefix="pages.product.transactional.options.packageSize"
                multiple={false}
                value={[packageSizesValues[0]]}
                onChange={(v) => console.log('changed', v)}
              />
              <div className="border border-dashed border-brand-grey-bombay">Quantity placeholder</div>
            </div>
            <div className="mt-3">
              {variants && (
                <Typography type={TypographyType.Heading} size={TypographySize.Small} className="mr-1">
                  {formatPrice(variants?.nodes[0].price, currencyCode)}
                </Typography>
              )}
              {pricePerKg && (
                <Typography
                  type={TypographyType.Paragraph}
                  size={TypographySize.Tiny}
                  className="text-coreUI-text-secondary"
                >
                  ({formatPrice(pricePerKg.value, 'EUR')}/kg)
                </Typography>
              )}
            </div>
            <div className="mb-3">
              <Typography
                as="div"
                type={TypographyType.Paragraph}
                size={TypographySize.Tiny}
                className="text-coreUI-text-secondary"
              >
                {t('pages.product.transactional.price.footNote')}
              </Typography>
            </div>
            <Button
              type="submit"
              emphasis={ButtonEmphasis.Primary}
              size={ButtonSize.md}
              className="flex w-full justify-center"
            >
              {t('pages.product.transactional.cta')}
            </Button>
            <div className="mt-2">
              <Typography type={TypographyType.Paragraph} size={TypographySize.Small}>
                <strong>{t('pages.product.transactional.shipping.label')}</strong>
                {': '}
                {t('pages.product.transactional.shipping.value')}
              </Typography>
            </div>
            <div>
              <Typography
                type={TypographyType.Paragraph}
                size={TypographySize.Tiny}
                className="text-coreUI-text-secondary"
              >
                {t('pages.product.transactional.qualityNote')}
              </Typography>
            </div>
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
