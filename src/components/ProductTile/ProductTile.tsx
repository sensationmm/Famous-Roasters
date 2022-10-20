import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tag, TagType, Typography, TypographySize, TypographyType } from 'src/components'
import { formatPrice } from 'src/utils'
import { ProductCustom } from 'src/views/Product'

import { ProductTileLoaderImage } from './ProductTileLoader'

interface ProductTileProps extends React.HTMLAttributes<HTMLElement> {
  productNode: ProductCustom
  showImage?: boolean
  showFrom?: boolean
  featured?: boolean
  showType?: 'vendor' | 'category'
}

export const ProductTile: React.FC<ProductTileProps> = ({
  productNode,
  showImage = true,
  showFrom = false,
  featured = false,
  className,
  showType = 'vendor',
}: ProductTileProps) => {
  const {
    title,
    vendor,
    featuredImage,
    images,
    priceRange,
    pricePerKg,
    coffee_type,
    accessory_type,
    origin,
    decaf,
    totalInventory,
  } = productNode
  const { t } = useTranslation()
  const [imageLoaded, setImageLoaded] = useState(false)

  const getOuterContainerClasses = () => {
    const classNames: string[] = []
    className?.split(' ').map((c) => classNames.push(c))
    if (!featured) {
      classNames.push('flex', 'pt-8')
    }
    return classNames.join(' ')
  }

  const getTextDataContainerClasses = () => {
    const classNames: string[] = ['flex', 'flex-col', 'w-full', 'justify-center']
    if (!featured) {
      classNames.push('pl-4')
    }
    return classNames.join(' ')
  }

  if (showImage && !featuredImage && (!images || !images.nodes[0])) return null
  const imgSrc = featuredImage?.url ? featuredImage.url : images.nodes[0].url
  const outOfStock = totalInventory !== undefined && totalInventory !== null && totalInventory <= 0
  const textLineClassNames = outOfStock
    ? 'text-coreUI-text-tertiary'
    : featured
    ? 'mt-1 text-coreUI-text-secondary'
    : 'text-coreUI-text-secondary'

  return (
    <div className={getOuterContainerClasses()}>
      <img src={`${imgSrc}&width=150&height=150`} alt={title} className="hidden" onLoad={() => setImageLoaded(true)} />
      {showImage && (
        <div className="flex justify-center items-center shrink-0 self-center relative w-32 h-32">
          <div className="flex justify-center items-center rounded-full bg-coreUI-background-images w-32 h-32">
            <img
              src={`${imgSrc}&width=150&height=150`}
              alt={title}
              className="w-28 max-h-28"
              width="150px"
              height="150px"
            />
            {decaf && decaf.value === 'true' && (
              <Tag type={TagType.Decaf} value="Decaf" small={true} className="absolute top-2 left-0" />
            )}
          </div>
        </div>
      )}
      {showImage && !imageLoaded && (
        <div className="absolute">
          <ProductTileLoaderImage />
        </div>
      )}
      <div className={getTextDataContainerClasses()}>
        {featured ? (
          <Typography
            as="div"
            type={TypographyType.Heading}
            size={TypographySize.Tiny}
            className={outOfStock ? 'text-coreUI-text-tertiary' : ''}
          >
            {title}
          </Typography>
        ) : (
          <Typography
            as="div"
            type={TypographyType.Label}
            size={TypographySize.Base}
            className={outOfStock ? 'text-coreUI-text-tertiary' : ''}
          >
            {title}
          </Typography>
        )}
        <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Base} className={textLineClassNames}>
          {showType === 'vendor' ? vendor : accessory_type?.value}
        </Typography>
        {origin && (
          <Typography
            as="div"
            type={TypographyType.Paragraph}
            size={TypographySize.Base}
            className={textLineClassNames}
          >
            {origin.value
              .replace(', ', ',')
              .split(',')
              .map((x, idx) =>
                idx === origin.value.split(',').length - 1
                  ? t(`pages.catalogue.filters.origin.values.${x}`)
                  : t(`pages.catalogue.filters.origin.values.${x}`) + ', ',
              )}
          </Typography>
        )}
        {coffee_type && (
          <Typography
            as="div"
            type={TypographyType.Paragraph}
            size={TypographySize.Base}
            className={textLineClassNames}
          >
            {coffee_type.value}
          </Typography>
        )}
        <div className="flex items-baseline">
          {featured ? (
            <Typography
              as="div"
              type={TypographyType.Label}
              size={TypographySize.Large}
              className={`mr-1 mt-1${outOfStock ? ' text-gray-400' : ''}`}
            >
              {showFrom && t('pages.catalogue.tile.from') + ' '}
              {formatPrice(priceRange.minVariantPrice.amount, priceRange.minVariantPrice.currencyCode)}
            </Typography>
          ) : (
            <Typography
              type={TypographyType.Label}
              size={TypographySize.Base}
              className={`mr-1${outOfStock ? ' text-coreUI-text-tertiary' : ''}`}
            >
              {showFrom && t('pages.catalogue.tile.from') + ' '}
              {formatPrice(priceRange.minVariantPrice.amount, priceRange.minVariantPrice.currencyCode)}
            </Typography>
          )}
          {pricePerKg && (
            <Typography
              type={TypographyType.Paragraph}
              size={TypographySize.Tiny}
              className={outOfStock ? 'text-coreUI-text-tertiary' : 'text-coreUI-text-secondary'}
            >
              ({formatPrice(pricePerKg.value, 'EUR')}/kg)
            </Typography>
          )}
        </div>
        {outOfStock && (
          <Typography type={TypographyType.Paragraph} size={TypographySize.Tiny} className="text-negative">
            {t('pages.product.transactional.outOfStock')}
          </Typography>
        )}
      </div>
    </div>
  )
}
