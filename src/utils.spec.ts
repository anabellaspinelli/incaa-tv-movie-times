import { getIntegersInRange } from './utils'

describe('getIntegersInRange', () => {
  it('returns the integers in the given range', () => {
    expect(getIntegersInRange(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('includes the start and end numbers', () => {
    const rangeStart = 1
    const rangeEnd = 10
    const result = getIntegersInRange(rangeStart, rangeEnd)

    expect(result[0]).toEqual(rangeStart)
    expect(result[result.length - 1]).toEqual(rangeEnd)
  })
})
