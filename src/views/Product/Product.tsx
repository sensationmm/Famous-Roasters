import { useQuery } from '@apollo/client/react/hooks'
import {
  Product as ProductType,
  ProductVariant,
  ProductVariantConnection,
} from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useContext, useEffect, useRef, useState } from 'react'
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
  Icon,
  IconName,
  IconSize,
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
import { formatPrice, getAPIId, parseHtmlSafely } from 'src/utils'

import { FindSimilar } from './FindSimilar'
import { YouMightLike } from './YouMightLike'

export interface ProductMeta {
  value: string
}

export interface ProductMetaInteger {
  value: number
}

export interface ProductVariantCustom extends ProductVariant {
  grind_type?: ProductMeta
  package_size: ProductMeta
  equipmentvariant?: ProductMeta
  availableForSale: boolean
}

export interface ProductVariantConnectionCustom extends ProductVariantConnection {
  nodes: Array<ProductVariantCustom>
}

export interface ProductCustom extends ProductType {
  extraDescription?: ProductMeta
  coffee_type?: ProductMeta
  accessory_type?: ProductMeta
  bean_type?: ProductMeta
  aroma?: ProductMeta
  flavourNotes?: ProductMeta
  origin?: ProductMeta
  producer?: ProductMeta
  altitude?: ProductMeta
  variety?: ProductMeta
  processing?: ProductMeta
  sweetness?: ProductMetaInteger
  body?: ProductMetaInteger
  bitterness?: ProductMetaInteger
  acidity?: ProductMetaInteger
  pricePerKg?: ProductMeta
  decaf?: ProductMeta
  whyThisCoffee?: ProductMeta
  vendor_description?: ProductMeta
  variants: ProductVariantConnectionCustom
  vendor_image?: ProductMeta
}

export interface ProductQuery {
  product: ProductCustom
}

export const Product: React.FC = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const GET_PRODUCT = loader('src/graphql/queries/product.query.graphql')
  const [quantity, setQuantity] = useState<number>(1)
  const [variantSelected, setVariantSelected] = useState<ProductVariantCustom>()
  const { addToCart } = useContext(CartContext)
  const stickyCTARef = useRef<null | HTMLDivElement>(null)
  const detailsRef = useRef<null | HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState<boolean>(true)
  const [isFixed, setIsFixed] = useState<boolean>(false)
  const [packageSizes, setPackageSizes] = useState<ListBoxItem[]>([])

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.product.title')}`

    const handleScroll = () => {
      const stickyOffsetTop = stickyCTARef.current?.offsetTop || 0
      const relScrollWindow = window.outerHeight + window.scrollY
      if (relScrollWindow > stickyOffsetTop) {
        setIsSticky(false)
        if (window.scrollY > stickyOffsetTop) {
          setIsFixed(true)
        } else {
          setIsFixed(false)
        }
      } else {
        setIsSticky(true)
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const { loading, error, data } = useQuery<ProductQuery>(GET_PRODUCT, {
    variables: {
      id: getAPIId(id || ''),
    },
  })

  const {
    title,
    productType,
    vendor,
    coffee_type,
    accessory_type,
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
    extraDescription,
  } = data?.product || {}

  const isAccessory = productType === 'Accessories'

  useEffect(() => {
    if (variants) {
      setVariantSelected(variants.nodes[0])
    }
  }, [!!variants])

  useEffect(() => {
    variantSelected &&
      variantSelected.package_size &&
      (variantSelected.grind_type
        ? setPackageSizes(packageSizesValues(variantSelected.grind_type.value))
        : variantSelected.equipmentvariant
        ? setPackageSizes(packageSizesValues(undefined, variantSelected.equipmentvariant.value))
        : setPackageSizes(packageSizesValues()))
  }, [variantSelected])

  if (error) {
    // console.log('error', error)
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
    const availableSizesForGrindType = packageSizesValues(v[0].name)
    setPackageSizes(availableSizesForGrindType)

    const updatedSelected =
      variants &&
      variants.nodes.find(
        (x) => x.grind_type?.value === v[0].name && x.package_size?.value === availableSizesForGrindType[0].name,
      )
    updatedSelected && setVariantSelected(updatedSelected)
  }

  const updateVariantSelectedWithPackage = (v: ListBoxItem[]) => {
    const check = (x: ProductVariantCustom) =>
      variantSelected.grind_type
        ? x.package_size?.value === v[0].name && x.grind_type?.value === variantSelected.grind_type.value
        : x.package_size?.value === v[0].name
    const updatedSelected = variants && variants.nodes.find((x) => check(x))
    updatedSelected && setVariantSelected(updatedSelected)
  }

  const updateVariantSelectedWithEquipmentVariant = (v: ListBoxItem[]) => {
    const updatedSelected = variants && variants.nodes.find((x) => x.equipmentvariant?.value === v[0].name)
    updatedSelected && setVariantSelected(updatedSelected)
  }

  const currencyCode = 'EUR'
  const grindTypeValues = () => {
    const availableGrindTypes =
      Array.from(new Set(variants.nodes.map((variant) => variant.grind_type?.value))).map((x) => ({
        name: x,
        value: x,
      })) || []
    !packageSizes && setPackageSizes(packageSizesValues(availableGrindTypes[0].name))
    return availableGrindTypes
  }

  const packageSizesValues = (grindType?: string, variantType?: string) =>
    Array.from(
      new Set(
        variants.nodes
          .filter((variant) => (grindType ? variant.grind_type?.value === grindType : true))
          .filter((variant) => (variantType ? variant.equipmentvariant?.value === variantType : true))
          .map((variant) => ({
            name: variant.package_size?.value,
            value: variant.package_size?.value,
            disabled: variant.availableForSale !== true,
          })),
      ) || [],
    ).map((x) => x) || []

  const variantValues = () =>
    Array.from(
      new Set(
        variants.nodes.map((variant) => ({
          name: variant.equipmentvariant?.value,
          value: variant.equipmentvariant?.value,
          disabled: variant.availableForSale !== true,
        })),
      ) || [],
    ).map((x) => x) || []

  const backToDetails = () => {
    if (detailsRef?.current?.offsetTop && detailsRef.current.offsetTop < window.scrollY) {
      detailsRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleAddToCart = () => {
    addToCart && addToCart({ quantity, item: variantSelected.id })
  }

  const renderCTAContent = () => {
    return (
      <>
        <div>
          {variants && (
            <>
              <Typography type={TypographyType.Heading} size={TypographySize.Small} className="mr-1">
                {formatPrice((quantity * parseFloat(variantSelected?.price)).toString(), currencyCode)}
              </Typography>
              <Typography
                type={TypographyType.Paragraph}
                size={TypographySize.Tiny}
                className="text-coreUI-text-tertiary"
              >
                (
                {variantSelected?.package_size &&
                  formatPrice(
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
            className="text-coreUI-text-tertiary"
          >
            {t('pages.product.transactional.price.footNote')}
          </Typography>
        </div>
        <div className="flex align-middle">
          <Button
            type="button"
            emphasis={ButtonEmphasis.Primary}
            size={ButtonSize.md}
            className="flex w-full justify-center md:hidden"
            onClick={!isFixed && !isSticky ? handleAddToCart : backToDetails}
            data-testid="addToCart"
            disabled={!variantSelected.availableForSale}
          >
            <span>
              <Icon name={!isFixed && !isSticky ? IconName.AddToCart : IconName.StickyCart} size={IconSize.lg} />
            </span>
          </Button>
          <Button
            type="button"
            emphasis={ButtonEmphasis.Primary}
            size={ButtonSize.md}
            className="flex w-full justify-center hidden md:block"
            onClick={handleAddToCart}
            data-testid="addToCart"
            disabled={!variantSelected.availableForSale}
          >
            <span>{t('pages.product.transactional.cta')}</span>
          </Button>
        </div>
      </>
    )
  }

  const renderCTAFooter = () => {
    return (
      <>
        <div className="mt-4">
          <Typography type={TypographyType.Paragraph} size={TypographySize.Small}>
            <strong>{t('pages.product.transactional.shipping.label')}</strong>
            {': '}
            {t('pages.product.transactional.shipping.value')}
          </Typography>
        </div>
        <div>
          <Typography type={TypographyType.Paragraph} size={TypographySize.Tiny} className="text-coreUI-text-secondary">
            {t(`pages.product.transactional.qualityNote${isAccessory ? 'Accessory' : ''}`)}
          </Typography>
        </div>
      </>
    )
  }

  const stickyCTAClassNames = () => {
    const classNames = [
      'md:hidden',
      'transition-all',
      'ease-linear',
      'delay-75',
      'mt-4',
      'grid',
      'gap-4',
      'grid-cols-2',
      'grid-rows-1',
      'px-6',
      'py-4',
      'w-full',
    ]
    if (isSticky) {
      classNames.push('sticky', 'bottom-0', 'z-20', 'bg-brand-grey-woodsmoke', 'text-white', 'md:hidden')
    }
    if (isFixed) {
      classNames.push('fixed', 'bottom-0', 'z-20', 'bg-brand-grey-woodsmoke', 'text-white', 'md:hidden')
    }
    return classNames.join(' ')
  }

  const renderMobileStickyCTABlock = () => {
    return (
      <>
        {/* Sticky transactional section */}
        <span ref={stickyCTARef} />
        <div className={stickyCTAClassNames()}>{renderCTAContent()}</div>
        <div className="w-full max-w-7xl mx-auto px-6 md:hidden">{renderCTAFooter()}</div>
      </>
    )
  }

  const renderProductMainBlock = () => {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-10">
        {/* Images */}
        {images && images.nodes.length > 0 && <Carousel images={images.nodes} />}
        <div>
          <span ref={detailsRef} />
          {/* Vendor and bean_type */}
          <div className="mb-2">
            <Typography
              as="h2"
              type={TypographyType.Paragraph}
              size={TypographySize.Small}
              className="text-coreUI-text-secondary"
            >
              {isAccessory ? accessory_type?.value || '' : coffee_type ? `${vendor} | ${coffee_type.value}` : vendor}
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
            <div className="mt-4 pb-4 border-b border-brand-grey-whisper">
              <TasteProfile
                sweetness={sweetness.value}
                body={body.value}
                bitterness={bitterness.value}
                acidity={acidity.value}
              />
            </div>
          )}

          {isAccessory && descriptionHtml && (
            <div
              className="pt-4 border-b border-brand-grey-whisper"
              dangerouslySetInnerHTML={{ __html: parseHtmlSafely(descriptionHtml) }}
            />
          )}

          {/* Transactional section */}
          <div className="pt-4">
            <div>
              {variants && variants.nodes.length >= 1 && variants.nodes[0].grind_type && (
                <Listbox
                  items={grindTypeValues() as ListBoxItem[]}
                  hasTranslatedValues={false}
                  translationPrefix="pages.product.transactional.options.grindType"
                  multiple={false}
                  value={[
                    {
                      name: variantSelected?.grind_type?.value || '',
                      value: variantSelected?.grind_type?.value || '',
                    },
                  ]}
                  onChange={(v) => v && updateVariantSelectedWithGrind(v)}
                  label={t('pages.product.transactional.options.grindType.label')}
                  addOn={<GrindsInfo />}
                />
              )}
            </div>
            <div className="grid gap-6 grid-cols-2 mt-4">
              {variants && variants.nodes[0].package_size && (
                <Listbox
                  items={packageSizes}
                  hasTranslatedValues={false}
                  translationPrefix="pages.product.transactional.options.packageSize"
                  multiple={false}
                  value={[
                    {
                      name: variantSelected?.package_size?.value || '',
                      value: variantSelected?.package_size?.value || '',
                    },
                  ]}
                  onChange={(v) => v && updateVariantSelectedWithPackage(v)}
                  label={t('pages.product.transactional.options.packageSize.label')}
                />
              )}
              {variants && variants.nodes[0].equipmentvariant && (
                <Listbox
                  items={variantValues() as ListBoxItem[]}
                  hasTranslatedValues={false}
                  translationPrefix="pages.product.transactional.options.equipmentvariant"
                  multiple={false}
                  value={[
                    {
                      name: variantSelected?.equipmentvariant?.value || '',
                      value: variantSelected?.equipmentvariant?.value || '',
                    },
                  ]}
                  onChange={(v) => v && updateVariantSelectedWithEquipmentVariant(v)}
                  label={t('pages.product.transactional.options.equipmentvariant.label')}
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
                  disabled={!variantSelected.availableForSale}
                />
              </div>
            </div>
            <div className="hidden md:grid gap-4 grid-cols-1 grid-rows-2 mt-4 w-full">{renderCTAContent()}</div>
            <div className="hidden md:block">{renderCTAFooter()}</div>
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
    const blocksData = !isAccessory
      ? [{ key: 'getToKnow' }, { key: 'meetTheRoaster' }, { key: 'findSimilar' }]
      : [{ key: 'aboutProduct' }, { key: 'youMightLike' }]

    const renderProductBlockContent = (key: string) => {
      switch (key) {
        case 'getToKnow':
          return renderProductBlockContentGetToKnow()
        case 'meetTheRoaster':
          return vendor_description?.value && vendor_image?.value ? renderProductBlockContentMeetTheRoaster() : null
        case 'findSimilar':
          return aroma ? <FindSimilar aroma={aroma.value} productId={id as string} /> : null
        case 'youMightLike':
          return <YouMightLike productId={id as string} />
        case 'aboutProduct':
          return extraDescription?.value
        default:
          return ''
      }
    }

    return (
      <div className="mt-6">
        {blocksData.map((blockData, idx) => {
          const content = renderProductBlockContent(blockData.key)

          if (!content) return null

          return (
            <Disclosure
              key={`pdp-disclosure-${idx}`}
              className="border-t border-coreUI-border"
              buttonChildren={
                <Typography type={TypographyType.Heading} size={TypographySize.Tiny}>
                  {t(`pages.product.sections.${blockData.key}.title`)}
                </Typography>
              }
              defaultOpen={true}
              canToggle={['findSimilar', 'youMightLike'].filter((el) => el === blockData.key).length === 0}
              panelChildren={content}
            />
          )
        })}
      </div>
    )
  }

  return (
    <Layout>
      <main className="flex flex-col w-full items-start justify-center bg-white mt-4 mb-4">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">{renderProductMainBlock()}</div>
        {renderMobileStickyCTABlock()}
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">{id && renderProductCollapsableBlocks()}</div>
      </main>
    </Layout>
  )
}
