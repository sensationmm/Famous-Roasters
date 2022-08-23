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

export const getSimplifiedProductId = (id: string) => id.split('gid://shopify/Product/')[1]

export const getAPIProductId = (id: string) => `gid://shopify/Product/${id}`

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
    default:
      return 'experimental'
  }
}
