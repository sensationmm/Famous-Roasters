import { useQuery } from '@apollo/client/react/hooks'
import {
  Product as ProductType,
  ProductVariant,
  ProductVariantConnection,
} from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  Carousel,
  CartContext,
  Disclosure,
  ErrorPrompt,
  GrindsInfo,
  Layout,
  Listbox,
  ListBoxItem,
  Loader,
  OriginProductionSpecs,
  QuantitySelect,
  Tag,
  TagType,
  TasteProfile,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { formatPrice, getAPIProductId, parseHtmlSafely } from 'src/utils'

import { FindSimilar } from './FindSimilar'

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
  decaf?: ProductMeta
  vendor_description?: ProductMeta
  variants: ProductVariantConnectionCustom
  vendor_image?: ProductMeta
}

interface ProductQuery {
  product: ProductCustom
}

export const Product: React.FC = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const GET_PRODUCT = loader('src/graphql/queries/product.query.graphql')
  const [quantity, setQuantity] = useState<number>(1)
  const [variantSelected, setVariantSelected] = useState<ProductVariantCustom>()
  const { addToCart } = useContext(CartContext)

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
    coffee_type,
    aroma,
    flavourNotes,
    origin,
    producer,
    altitude,
    variety,
    processing,
    sweetness,
    body,
    bitterness,
    acidity,
    images,
    variants,
    descriptionHtml,
    decaf,
    vendor_description,
    vendor_image,
  } = data?.product || {}

  useEffect(() => {
    if (variants) {
      setVariantSelected(variants.nodes[0])
    }
  }, [!!variants])

  if (error) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  if (loading || !variantSelected || !variants) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  const updateVariantSelectedWithGrind = (v: ListBoxItem[]) => {
    const updatedSelected =
      variants &&
      variants.nodes.find(
        (x) => x.grind_type.value === v[0].name && x.package_size.value === variantSelected.package_size.value,
      )
    updatedSelected && setVariantSelected(updatedSelected)
  }

  const updateVariantSelectedWithPackage = (v: ListBoxItem[]) => {
    const updatedSelected =
      variants &&
      variants.nodes.find(
        (x) => x.package_size.value === v[0].name && x.grind_type.value === variantSelected.grind_type.value,
      )
    updatedSelected && setVariantSelected(updatedSelected)
  }

  const currencyCode = 'EUR'
  const grindTypeValues = () =>
    Array.from(new Set(variants.nodes.map((variant) => variant.grind_type.value))).map((x) => ({
      name: x,
    })) || []
  const packageSizesValues = () =>
    Array.from(new Set(variants.nodes.map((variant) => variant.package_size.value))).map((x) => ({ name: x })) || []

  const handleAddToCart = () => {
    addToCart && addToCart({ quantity, item: variantSelected.id })
  }

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
              {coffee_type ? `${vendor} | ${coffee_type.value}` : vendor}
            </Typography>
          </div>
          {/* Title */}
          <div className="border-b border-brand-grey-whisper pb-4">
            <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Small}>
              {title}
            </Typography>
            {/* Decaf tag */}
            {decaf && decaf.value === 'true' && (
              <div className="mt-1">
                <Tag type={TagType.Decaf} value="Decaf" />
              </div>
            )}
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
          <div className="mt-4 pt-4 border-t border-brand-grey-whisper">
            <div>
              {variants && variants.nodes[0].grind_type && (
                <Listbox
                  items={grindTypeValues()}
                  hasTranslatedValues={false}
                  translationPrefix="pages.product.transactional.options.grindType"
                  multiple={false}
                  value={[{ name: variantSelected?.grind_type?.value }]}
                  onChange={(v) => v && updateVariantSelectedWithGrind(v)}
                  label={t('pages.product.transactional.options.grindType.label')}
                  addOn={<GrindsInfo />}
                />
              )}
            </div>
            <div className="grid gap-6 grid-cols-2 mt-4">
              {variants && variants.nodes[0].package_size && (
                <Listbox
                  items={packageSizesValues()}
                  hasTranslatedValues={false}
                  translationPrefix="pages.product.transactional.options.packageSize"
                  multiple={false}
                  value={[{ name: variantSelected?.package_size?.value }]}
                  onChange={(v) => v && updateVariantSelectedWithPackage(v)}
                  label={t('pages.product.transactional.options.packageSize.label')}
                />
              )}
              <div>
                <QuantitySelect
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(q: number) => setQuantity(q)}
                  label={t('pages.product.transactional.options.quantity.label')}
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 grid-rows-2 mt-4">
              <div>
                {variants && (
                  <>
                    <Typography type={TypographyType.Heading} size={TypographySize.Small} className="mr-1">
                      {formatPrice((quantity * parseFloat(variantSelected?.price)).toString(), currencyCode)}
                    </Typography>
                    <Typography
                      type={TypographyType.Paragraph}
                      size={TypographySize.Tiny}
                      className="text-coreUI-text-secondary"
                    >
                      (
                      {formatPrice(
                        (
                          (parseFloat(variantSelected?.price) * 1000) /
                          parseFloat(variantSelected?.package_size?.value)
                        ).toString(),
                        'EUR',
                      )}
                      /kg)
                    </Typography>
                  </>
                )}
                <Typography
                  as="div"
                  type={TypographyType.Paragraph}
                  size={TypographySize.Tiny}
                  className="text-coreUI-text-secondary"
                >
                  {t('pages.product.transactional.price.footNote')}
                </Typography>
              </div>
              <div className="flex align-middle">
                <Button
                  type="button"
                  emphasis={ButtonEmphasis.Primary}
                  size={ButtonSize.md}
                  className="flex w-full justify-center"
                  onClick={handleAddToCart}
                  data-testid="addToCart"
                >
                  {t('pages.product.transactional.cta')}
                </Button>
              </div>
            </div>
            <div className="mt-4">
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

  const renderProductBlockContentGetToKnow = () => (
    <>
      {descriptionHtml && <div dangerouslySetInnerHTML={{ __html: parseHtmlSafely(descriptionHtml) }} />}

      {/* Characteristics section */}
      <div className="mt-8">
        <Typography
          as="div"
          type={TypographyType.Label}
          size={TypographySize.Base}
          className="pb-2 mb-4 border-b border-coreUI-border"
        >
          {t('pages.product.originProcessing.title')}
        </Typography>
        <OriginProductionSpecs
          flavourNotes={flavourNotes?.value}
          origin={origin?.value}
          producer={producer?.value}
          altitude={altitude?.value}
          variety={variety?.value}
          processing={processing?.value}
        />
      </div>
    </>
  )

  const renderProductBlockContentMeetTheRoaster = () => {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
        <div className="order-1 xl:order-2 xl:max-w-screen-xl xl:mx-auto xl:px-24">
          <img src={vendor_image?.value} alt={vendor} />
        </div>
        <div className="order-2 xl:order-1 xl:max-w-screen-xl xl:mx-auto">
          <Typography as="p">{vendor_description?.value}</Typography>
        </div>
      </div>
    )
  }

  const renderProductCollapsableBlocks = () => {
    // some blocks - disabled as no real content yet
    // const blocksData = [{ key: 'getToKnow' }, { key: 'meetTheRoaster' }, { key: 'learnToBrew' }, { key: 'findSimilar' }]
    const blocksData = [{ key: 'getToKnow' }, { key: 'meetTheRoaster' }, { key: 'findSimilar' }]

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

    const renderProductBlockContent = (key: string) => {
      switch (key) {
        case 'getToKnow':
          return renderProductBlockContentGetToKnow()
        case 'meetTheRoaster':
          return vendor_description?.value && vendor_image?.value ? renderProductBlockContentMeetTheRoaster() : null
        case 'findSimilar':
          return aroma ? <FindSimilar aroma={aroma.value} productId={id} /> : null
        default:
          return placeHolderText
      }
    }

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
            defaultOpen={blockData.key === 'getToKnow' || blockData.key === 'findSimilar'}
            canToggle={blockData.key !== 'findSimilar'}
            panelChildren={renderProductBlockContent(blockData.key)}
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
