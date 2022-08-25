import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, TypographySize, TypographyType } from 'src/components'
import { formatPrice, getSimplifiedId } from 'src/utils'
import { OrderVariant } from 'src/views'

import { RateYourCoffee } from '../RateYourCoffee'

export interface OrderTileProps extends OrderVariant {
  productId: string
  showRate?: boolean
  isSmall?: boolean
  showPrice?: boolean
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
    isSmall = false,
    showPrice = true,
  } = props

  return (
    <div data-testid="wrapper" className={`flex ${!isSmall ? 'pt-8' : 'pt-4'} w-full`}>
      <div
        className={`flex justify-center items-center shrink-0 self-center relative ${
          !isSmall ? 'w-32 h-32' : 'w-16 h-16'
        } cursor-pointer`}
        data-testid="image"
        onClick={() => navigate(`/product/${getSimplifiedId(productId)}`)}
      >
        <div
          className={`flex justify-center items-center rounded-full bg-coreUI-background-images ${
            !isSmall ? 'w-32 h-32' : 'w-16 h-16'
          }`}
        >
          <img src={src} alt={title} className={!isSmall ? 'w-28 max-h-28' : 'w-14 max-h-14'} />
        </div>
      </div>
      <div className={'pl-4 flex flex-col justify-center'}>
        <div
          className="mb-2 cursor-pointer"
          data-testid="tile"
          onClick={() => navigate(`/product/${getSimplifiedId(productId)}`)}
        >
          <Typography as="div" type={TypographyType.Label} size={!isSmall ? TypographySize.Base : TypographySize.Small}>
            {quantity !== 1 ? `${quantity} x ${title}` : title}
          </Typography>
          {variantTitle !== 'Default Title' && (
            <Typography
              as="div"
              type={TypographyType.Paragraph}
              size={!isSmall ? TypographySize.Base : TypographySize.Small}
              className={'text-coreUI-text-secondary'}
            >
              {variantTitle}
            </Typography>
          )}
          {showPrice && (
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
          )}
        </div>

        {showRate && <RateYourCoffee productOrderTile={{ ...props, showRate: false }} />}
      </div>
    </div>
  )
}
