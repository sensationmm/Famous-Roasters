import { formatPrice, getAPIProductId, getSimplifiedProductId } from '.'

describe('Formatter utils', () => {
  it('Format price works', () => {
    expect(formatPrice('9.99', 'EUR')).toEqual('9,99 €')
  })

  it('Simplified product id works', () => {
    expect(getSimplifiedProductId('gid://shopify/Product/7655228866776')).toEqual('7655228866776')
  })

  it('API product id works', () => {
    expect(getAPIProductId('7655228866776')).toEqual('gid://shopify/Product/7655228866776')
  })
})
