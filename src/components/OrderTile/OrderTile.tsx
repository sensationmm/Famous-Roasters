import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, TypographySize, TypographyType } from 'src/components'
import { formatPrice, getSimplifiedProductId } from 'src/utils'
import { OrderVariant } from 'src/views'

import { RateYourCoffee } from '../RateYourCoffee'

export interface OrderTileProps extends OrderVariant {
  productId: string
  showRate?: boolean
}

export const OrderTile: React.FC<OrderTileProps> = ({ ...props }) => {
  const navigate = useNavigate()

  const {
    productId,
    node: {
      title,
      image: { src },
      quantity,
      variant: { title: variantTitle, price, weight },
    },
    showRate = false,
  } = props

  return (
    <div data-testid="wrapper" className={'flex pt-8 md:px-6 w-full'}>
      <div
        className="flex justify-center items-center shrink-0 self-center relative w-32 h-32 cursor-pointer"
        onClick={() => navigate(`/product/${getSimplifiedProductId(productId)}`)}
      >
        <div className="flex justify-center items-center rounded-full bg-coreUI-background-images w-32 h-32">
          <img src={src} alt={title} className="w-28 max-h-28" />
        </div>
      </div>
      <div className={'pl-4 flex flex-col justify-center'}>
        <div className="mb-2 cursor-pointer" onClick={() => navigate(`/product/${getSimplifiedProductId(productId)}`)}>
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
              ({formatPrice(((1000 / weight) * parseFloat(price)).toString(), 'EUR')}/kg)
            </Typography>
          </div>
        </div>

        {showRate && <RateYourCoffee productOrderTile={{ ...props, showRate: false }} />}
      </div>
    </div>
  )
}
