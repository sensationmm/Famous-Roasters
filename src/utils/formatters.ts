export const formatPrice = (amount: string, currency: string) =>
  Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount))

export const getSimplifiedProductId = (id: string) => id.split('gid://shopify/Product/')[1]

export const getAPIProductId = (id: string) => `gid://shopify/Product/${id}`
