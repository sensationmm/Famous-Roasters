import { Product as ProductType } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tag, TagType, Typography, TypographySize, TypographyType } from 'src/components'
import { formatPrice } from 'src/utils'

interface ProductMeta {
  value: string
}

interface ProductCustom extends ProductType {
  coffee_type?: ProductMeta
  bean_type?: ProductMeta
  origin?: ProductMeta
  pricePerKg?: ProductMeta
  decaf?: ProductMeta
}

interface ProductTileProps extends React.HTMLAttributes<HTMLElement> {
  productNode: ProductCustom
  showImage?: boolean
  showFrom?: boolean
  featured?: boolean
}

export const ProductTile: React.FC<ProductTileProps> = ({
  productNode,
  showImage = true,
  showFrom = false,
  featured = false,
  className,
}: ProductTileProps) => {
  const { title, vendor, featuredImage, images, priceRange, pricePerKg, coffee_type, origin, decaf } = productNode
  const { t } = useTranslation()
  const textLineClassNames = featured ? 'mt-1 text-coreUI-text-secondary' : 'text-coreUI-text-secondary'

  if (showImage && !featuredImage && (!images || !images.nodes[0])) return null
  const imgSrc = featuredImage?.url ? featuredImage.url : images.nodes[0].url
  return (
    <div className={className ? 'flex pt-8 md:px-6 ' + className : 'flex pt-8 md:px-6'}>
      {showImage && (
        <div className="flex justify-center items-center shrink-0 self-center relative w-32 h-32">
          <div className="flex justify-center items-center rounded-full bg-coreUI-background-images w-32 h-32">
            <img src={imgSrc} alt={title} className="w-28 max-h-28" />
            {decaf && decaf.value === 'true' && (
              <Tag type={TagType.Decaf} value="Decaf" small={true} className="absolute top-2 left-0" />
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col w-full justify-between pl-4">
        {featured ? (
          <Typography as="div" type={TypographyType.Heading} size={TypographySize.Tiny}>
            {title}
          </Typography>
        ) : (
          <Typography as="div" type={TypographyType.Label} size={TypographySize.Base}>
            {title}
          </Typography>
        )}
        <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Base} className={textLineClassNames}>
          {vendor}
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
            <Typography as="div" type={TypographyType.Label} size={TypographySize.Large} className="mr-1 mt-1">
              {showFrom && t('pages.catalogue.tile.from') + ' '}
              {formatPrice(priceRange.minVariantPrice.amount, priceRange.minVariantPrice.currencyCode)}
            </Typography>
          ) : (
            <Typography type={TypographyType.Label} size={TypographySize.Base} className="mr-1">
              {showFrom && t('pages.catalogue.tile.from') + ' '}
              {formatPrice(priceRange.minVariantPrice.amount, priceRange.minVariantPrice.currencyCode)}
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
      </div>
    </div>
  )
}
