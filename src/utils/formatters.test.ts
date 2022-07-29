import { formatDate, formatPrice, getAPIProductId, getAromaKey, getSimplifiedProductId } from '.'

describe('Formatter utils', () => {
  it('Format date works', () => {
    expect(formatDate('2022-07-26T10:06:15Z')).toEqual('Tu, 26.07.2022')
  })

  it('Format price works', () => {
    expect(formatPrice('9.99', 'EUR')).toEqual('9,99 €')
  })

  it('Simplified product id works', () => {
    expect(getSimplifiedProductId('gid://shopify/Product/7655228866776')).toEqual('7655228866776')
  })

  it('API product id works', () => {
    expect(getAPIProductId('7655228866776')).toEqual('gid://shopify/Product/7655228866776')
  })

  it('Get aroma key works', () => {
    expect(getAromaKey('Floral & leicht')).toEqual('floral')
    expect(getAromaKey('Fruchtig & lebhaft')).toEqual('fruits')
    expect(getAromaKey('Nussig & schokoladig')).toEqual('chocolate')
    expect(getAromaKey('Würzig & kräftig')).toEqual('spicy')
    expect(getAromaKey('other')).toEqual('experimental')
  })
})
