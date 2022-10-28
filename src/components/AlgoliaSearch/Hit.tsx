import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { formatPrice } from 'src/utils'

import { Tag, TagType } from '../Tag'
import { Typography, TypographySize, TypographyType } from '../Typography'

type RawHit = {
  id: string
  title: string
  image: string
  product_image: string
  vendor: string
  inventory_quantity: number
  variants_inventory_count: number
  meta: {
    my_fields?: {
      decaf: boolean | string
      origin: string[]
      coffee_type: string
      price_per_kg: number
    }
  }
  variants_min_price: number
  variants_max_price: number
  variants_count: number
  inventory_management: string | undefined
}

const Hit = ({ hit }: { hit: RawHit }) => {
  const { t } = useTranslation()
  const showFrom = hit.variants_count > 1
  const {
    id,
    image,
    title,
    vendor,
    variants_inventory_count: totalInventory,
    inventory_management,
    variants_min_price,
  } = hit

  const origin = hit.meta.my_fields?.origin
  const decaf = hit.meta.my_fields?.decaf
  const coffee_type = hit.meta.my_fields?.coffee_type
  const price_per_kg = hit.meta.my_fields?.price_per_kg

  const isDecaf = decaf === true || decaf === 'true'
  const outOfStock =
    inventory_management === 'shopify' && totalInventory !== undefined && totalInventory !== null && totalInventory <= 0
  const textLineClassNames = outOfStock ? 'text-coreUI-text-tertiary' : 'text-coreUI-text-secondary'

  return (
    <Link to={`/product/${id}`} key={`product-tile-link-${id}`}>
      <div className="flex pt-8 md:px-6">
        <div className="flex justify-center items-center shrink-0 relative w-36 h-36">
          <div className="flex justify-center items-center rounded-full bg-coreUI-background-images w-36 h-36">
            <img
              src={`${image}&width=150&height=150`}
              alt={title}
              className="w-24 max-h-24"
              width="150px"
              height="150px"
            />
            {isDecaf && <Tag type={TagType.Decaf} value="Decaf" small={true} className="absolute top-2 left-0" />}
          </div>
        </div>

        <div className="flex flex-col w-full justify-start pl-4">
          <Typography
            as="div"
            type={TypographyType.Label}
            size={TypographySize.Base}
            className={outOfStock ? 'text-coreUI-text-tertiary' : ''}
          >
            {title}
          </Typography>
          <Typography
            as="div"
            type={TypographyType.Paragraph}
            size={TypographySize.Base}
            className={`flex flex-col w-full justify-start${outOfStock ? ' text-coreUI-text-tertiary' : ''}`}
          >
            {vendor}
          </Typography>
          {origin && (
            <Typography
              as="div"
              type={TypographyType.Paragraph}
              size={TypographySize.Base}
              className={textLineClassNames}
            >
              {origin.map((x, idx) =>
                idx === origin.length - 1
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
              {coffee_type}
            </Typography>
          )}

          <div className="flex items-baseline">
            <Typography
              type={TypographyType.Label}
              size={TypographySize.Base}
              className={`mr-1${outOfStock ? ' text-coreUI-text-tertiary' : ''}`}
            >
              {showFrom && t('pages.catalogue.tile.from') + ' '}
              {formatPrice(variants_min_price)}
            </Typography>
            {price_per_kg && (
              <Typography
                type={TypographyType.Paragraph}
                size={TypographySize.Tiny}
                className={outOfStock ? 'text-coreUI-text-tertiary' : 'text-coreUI-text-secondary'}
              >
                ({formatPrice(price_per_kg)}/kg)
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
    </Link>
  )
}

export default Hit
