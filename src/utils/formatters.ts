import { format } from 'date-fns'
import { de } from 'date-fns/locale'

export const formatDate = (date: string) => {
  return format(new Date(date), 'EEEEEE, dd.MM.yyyy', { locale: de })
}

export const formatPrice = (amount: string | number, currency = 'EUR') => {
  const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  return Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parsedAmount)
}

export type ShopifyAPIType = 'Product' | 'Order' | 'Collection'
export const getSimplifiedId = (id: string, type: ShopifyAPIType = 'Product') => id.split(`gid://shopify/${type}/`)[1]

export const getAPIId = (id: string, type: ShopifyAPIType = 'Product') => `gid://shopify/${type}/${id}`

export const getAromaKey = (aroma: string) => {
  switch (aroma) {
    case 'Floral & leicht':
      return 'floral'
    case 'Fruchtig & lebhaft':
      return 'fruits'
    case 'Nussig & schokoladig':
      return 'chocolate'
    case 'Würzig & kräftig':
      return 'spicy'
    case 'Experimentell & komplex':
      return 'experimental'
    default:
      return 'empty'
  }
}

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const normalizeString = (string: string) => {
  return string.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}
