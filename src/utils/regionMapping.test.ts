import { getRegion } from '.'

describe('RegionMapping utils', () => {
  it('works with valid code', () => {
    expect(getRegion('MX')).toEqual('latin')
  })

  it('works with invalid code', () => {
    expect(getRegion('AB')).toEqual(undefined)
  })
})
