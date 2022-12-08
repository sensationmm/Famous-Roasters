import { formatDate, formatPrice, getAPIId, getAromaKey, getSimplifiedId, normalizeString } from '.'
import { capitalize } from './formatters'

describe('Formatter utils', () => {
  it('Format date works', () => {
    expect(formatDate('2022-07-26T10:06:15Z')).toEqual('Di, 26.07.2022')
  })

  it('Format price works', () => {
    expect(formatPrice('9.99', 'EUR')).toEqual('9,99 €')
  })

  it('Simplified product id works', () => {
    expect(getSimplifiedId('gid://shopify/Product/7655228866776')).toEqual('7655228866776')
  })

  it('Simplified order id works', () => {
    expect(getSimplifiedId('gid://shopify/Order/7655228866776', 'Order')).toEqual('7655228866776')
  })

  it('Simplified collection id works', () => {
    expect(getSimplifiedId('gid://shopify/Collection/7655228866776', 'Collection')).toEqual('7655228866776')
  })

  it('API product id works', () => {
    expect(getAPIId('7655228866776')).toEqual('gid://shopify/Product/7655228866776')
  })

  it('API order id works', () => {
    expect(getAPIId('7655228866776', 'Order')).toEqual('gid://shopify/Order/7655228866776')
  })

  it('API collection id works', () => {
    expect(getAPIId('7655228866776', 'Collection')).toEqual('gid://shopify/Collection/7655228866776')
  })

  it('Get aroma key works', () => {
    expect(getAromaKey('Floral & leicht')).toEqual('floral')
    expect(getAromaKey('Fruchtig & lebhaft')).toEqual('fruits')
    expect(getAromaKey('Nussig & schokoladig')).toEqual('chocolate')
    expect(getAromaKey('Würzig & kräftig')).toEqual('spicy')
    expect(getAromaKey('Experimentell & komplex')).toEqual('experimental')
    expect(getAromaKey('other')).toEqual('empty')
    expect(getAromaKey('')).toEqual('empty')
  })

  describe('capitalize', () => {
    it('works for string', () => expect(capitalize('hello')).toEqual('Hello'))
    it('works for empty string', () => expect(capitalize('')).toEqual(''))
  })

  describe('normalizeString', () => {
    it('works', () => expect(normalizeString('Espressomühle')).toEqual('Espressomuhle'))
    it('works for multi', () => expect(normalizeString('Esprüssomühle')).toEqual('Esprussomuhle'))
  })
})
