// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dataLayerEvent = (ecommerceObject: Record<string, any>, eventLabel?: string) => {
  window.dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: eventLabel,
    ecommerce: ecommerceObject,
  })
}
