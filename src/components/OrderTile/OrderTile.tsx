import React from 'react'
import { Typography, TypographySize, TypographyType } from 'src/components'
import { formatPrice } from 'src/utils'
import { OrderVariant } from 'src/views'

type OrderTileProps = OrderVariant

export const OrderTile: React.FC<OrderTileProps> = ({
  node: {
    title,
    image: { url },
    quantity,
    variant: { title: variantTitle, price, weight },
  },
}: OrderTileProps) => {
  return (
    <div className={'flex pt-8 md:px-6'}>
      <div className="flex justify-center items-center shrink-0 self-center relative w-32 h-32">
        <div className="flex justify-center items-center rounded-full bg-coreUI-background-images w-32 h-32">
          <img src={url} alt={title} className="w-28 max-h-28" />
        </div>
      </div>
      <div className={'pl-4'}>
        <Typography as="div" type={TypographyType.Label} size={TypographySize.Base}>
          {quantity !== 1 ? `${quantity} x ${title}` : title}
        </Typography>
        {variantTitle !== 'Default Title' && (
          <Typography
            as="div"
            type={TypographyType.Paragraph}
            size={TypographySize.Base}
            className={'text-coreUI-text-secondary'}
          >
            {variantTitle}
          </Typography>
        )}
        <div className="flex items-baseline">
          <Typography type={TypographyType.Label} size={TypographySize.Base} className={`mr-1`}>
            {formatPrice(price, 'EUR')}
          </Typography>
          <Typography
            type={TypographyType.Paragraph}
            size={TypographySize.Tiny}
            className={'text-coreUI-text-secondary'}
          >
            ({formatPrice((parseInt(price) / weight).toString(), 'EUR')}/kg)
          </Typography>
        </div>
      </div>
    </div>
  )
}
