import { readTimeCalculator } from '.'

describe('ReadTimeCalculator util', () => {
  it('Should return 0 when the text is undefined, null or empty', () => {
    expect(readTimeCalculator(undefined)).toEqual(0)
    expect(readTimeCalculator(null)).toEqual(0)
    expect(readTimeCalculator('')).toEqual(0)
  })

  it('Should return the correct read time', () => {
    expect(readTimeCalculator('This is a short text.')).toEqual(1)
    expect(readTimeCalculator('This is a some text. '.repeat(50))).toEqual(2)
    expect(readTimeCalculator('This is a some text. '.repeat(200))).toEqual(5)

    // TODO: add more tests
  })
})
