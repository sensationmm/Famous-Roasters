import { formatPrice } from '.'

describe('Formatter utils', () => {
  it('Format price works', () => {
    expect(formatPrice('9.99', 'EUR')).toEqual('9,99 €')
  })
})
