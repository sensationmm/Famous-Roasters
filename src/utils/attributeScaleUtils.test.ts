import { toRoundedValueInRealScale, toValueInHumanScale } from '.'

describe('Attribute scale utils', () => {
  it('Value in human scale works as expected', () => {
    expect(toValueInHumanScale(1)).toEqual(1)
    expect(toValueInHumanScale(2)).toEqual(1)
    expect(toValueInHumanScale(3)).toEqual(1)
    expect(toValueInHumanScale(4)).toEqual(2)
    expect(toValueInHumanScale(5)).toEqual(2)
    expect(toValueInHumanScale(6)).toEqual(2)
    expect(toValueInHumanScale(7)).toEqual(2)
    expect(toValueInHumanScale(8)).toEqual(3)
    expect(toValueInHumanScale(9)).toEqual(3)
    expect(toValueInHumanScale(10)).toEqual(3)
  })

  it('Rounded value in real scale works as expected', () => {
    expect(toRoundedValueInRealScale(1)).toEqual(2)
    expect(toRoundedValueInRealScale(2)).toEqual(5)
    expect(toRoundedValueInRealScale(3)).toEqual(8)
  })
})
