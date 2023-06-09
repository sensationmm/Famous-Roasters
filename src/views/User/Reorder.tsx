import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonSize } from 'src/components'
import { Emphasis } from 'src/components/Button/Button'
import { CartContext, CartItem } from 'src/components/CartProvider/CartProvider'
import { Order } from 'src/views/User/Orders'

import { gtaEcommerceObject } from '../Cart/Cart'

interface ReorderItem extends CartItem {
  available: number
  ecommerceObject?: gtaEcommerceObject
}

type ReorderProps = {
  order: Order
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const Reorder: React.FC<ReorderProps> = ({ order, loading, setLoading }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)

  const handleReorder = async (items: ReorderItem[]) => {
    let redirect = '/cart'
    setLoading(true)
    if (addToCart) {
      let i = 0
      const reorder = async () => {
        if (items[i].available < items[i].quantity) {
          redirect = '/cart?missingItems=true'
        }

        if (items[i].available !== 0) {
          await addToCart({
            quantity: items[i].quantity < items[i].available ? items[i].quantity : items[i].available,
            item: items[i].item,
          })
        }
        if (i + 1 === items.length) {
          setLoading(false)
          navigate(redirect)
        } else {
          i++
          reorder()
        }
      }
      await reorder()
    }
  }

  return (
    <Button
      data-testid={`reorder-btn`}
      emphasis={Emphasis.Tertiary}
      fullWidth
      size={ButtonSize.sm}
      onClick={() =>
        !loading &&
        handleReorder(
          order.node.lineItems.edges.map((item) => ({
            quantity: item.node.quantity,
            item: item.node.variant.id,
            available: item.node.variant.inventoryQuantity || 0,
            ecommerceObject: {
              name: item.node.title,
              id: item.node.product.id,
              price: item.node.variant.price,
              // brand: item.node?.product.vendor, // not provided
              variant: item.node.variant.id,
              quantity: item.node.quantity,
              // packageSize: item.node.variant.package_size?.value,
              // grindType: item.node.variant.grind_type?.value,
              // equipmentVariant: item.node.variant.equipmentvariant?.value,
            },
          })),
        )
      }
      showLoading={loading}
    >
      {t('pages.orders.ctaReorder')}
    </Button>
  )
}
