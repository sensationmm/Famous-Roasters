import { Product } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import React from 'react'
import { Typography, TypographySize, TypographyType } from 'src/components'
import { formatPrice } from 'src/utils'

interface ProductTileProps {
  productNode: Product
}

export const ProductTile: React.FC<ProductTileProps> = ({ productNode }: ProductTileProps) => {
  const { title, vendor, featuredImage, priceRange } = productNode
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
        <Typography
          as="div"
          type={TypographyType.Paragraph}
          size={TypographySize.Small}
          className="text-coreUI-text-secondary"
        >
          Kolumbien
        </Typography>
        <Typography
          as="div"
          type={TypographyType.Paragraph}
          size={TypographySize.Small}
          className="text-coreUI-text-secondary"
        >
          Filter
        </Typography>
        <div>
          <Typography type={TypographyType.Label} size={TypographySize.Base} className="mr-1">
            {formatPrice(priceRange.minVariantPrice.amount, priceRange.minVariantPrice.currencyCode)}
          </Typography>
          <Typography type={TypographyType.Paragraph} size={TypographySize.Tiny} className="text-coreUI-text-secondary">
            (XX.XX €/kg)
          </Typography>
        </div>
      </div>
    </div>
  )
}
