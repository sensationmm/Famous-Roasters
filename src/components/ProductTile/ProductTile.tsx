import { Product as ProductType } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, TypographySize, TypographyType } from 'src/components'
import { formatPrice } from 'src/utils'

interface ProductMeta {
  value: string
}

interface ProductCustom extends ProductType {
  coffee_type?: ProductMeta
  bean_type?: ProductMeta
  origin?: ProductMeta
  pricePerKg?: ProductMeta
}

interface ProductTileProps {
  productNode: ProductCustom
}

export const ProductTile: React.FC<ProductTileProps> = ({ productNode }: ProductTileProps) => {
  const { title, vendor, featuredImage, priceRange, pricePerKg, coffee_type, origin } = productNode
  const { t } = useTranslation()
  if (!featuredImage || !priceRange.minVariantPrice.amount) return null
  return (
    <div className="flex p-6">
      <div className="shrink-0">
        <img src={featuredImage.url} alt={title} className="w-32" />
      </div>
      <div className="flex flex-col justify-between p-2">
        <Typography as="div" type={TypographyType.Label} size={TypographySize.Small}>
          {title}
        </Typography>
        <Typography
          as="div"
          type={TypographyType.Paragraph}
          size={TypographySize.Small}
          className="text-coreUI-text-secondary"
        >
          {vendor}
        </Typography>
        {origin && (
          <Typography
            as="div"
            type={TypographyType.Paragraph}
            size={TypographySize.Small}
            className="text-coreUI-text-secondary"
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
            size={TypographySize.Small}
            className="text-coreUI-text-secondary"
          >
            {coffee_type.value}
          </Typography>
        )}
        <div>
          <Typography type={TypographyType.Label} size={TypographySize.Base} className="mr-1">
            {formatPrice(priceRange.minVariantPrice.amount, priceRange.minVariantPrice.currencyCode)}
          </Typography>
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
